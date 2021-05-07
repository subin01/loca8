/* eslint-disable no-unused-vars */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { validateTagFormat } from '../utils'
import { iNotifyOwnerErrorTypes } from '../types'
import { SERVER_ERROR, TAG_INVALID, TAG_STATUS_REGISTERED, TAG_STATUS_UNREGISTERED } from '../global_constants'

!admin.apps.length ? admin.initializeApp() : admin.app()
const db = admin.firestore()

/**
 *  notifyOwner
 * Update User profile with Contact & Tag details
 * @param data
 * @param context
 */
export async function notifyTagOwner(data: any, context: any) {
  const notifyError = (
    error: boolean,
    errorType: iNotifyOwnerErrorTypes,
    message: string = 'Error: Please try again!'
  ) => {
    return {
      error,
      errorType,
      message,
    }
  }

  const tid = data?.tid
  const email = data?.email
  const name = data?.name
  const phone = data?.phone
  const message = data?.message

  functions.logger.log(':::::notifyTagOwner::v2:: ', data)

  if (!tid || !validateTagFormat(tid)) {
    return notifyError(true, TAG_INVALID, 'Invalid Tag Format!')
  }

  try {
    const tagsRef = db.collection('tags').doc(tid.trim())
    const tdoc = await tagsRef.get()

    if (!tdoc.exists) {
      functions.logger.log(`Invalid Tag TID: --${tid}--`)
      return notifyError(true, TAG_INVALID, 'Invalid Tag!')
    }

    const tagData = tdoc.data()
    const tagStatus = tagData?.status || ''
    const uid = tagData?.uid

    functions.logger.log('TagData: ', tagData)

    if (tagStatus !== TAG_STATUS_REGISTERED) {
      return notifyError(true, TAG_STATUS_UNREGISTERED, 'Unregistered Tag!')
    }

    if (!uid) {
      return notifyError(true, TAG_STATUS_UNREGISTERED, 'No Owner registered to this Tag!')
    }

    const usersRef = db.collection('users').doc(uid)
    const doc = await usersRef.get()
    if (!doc.exists) {
      return notifyError(true, TAG_STATUS_UNREGISTERED, 'Owner details unavailable!')
    }

    const newNotificationObj = {
      foundNotification: {
        tid,
        name,
        phone,
        email,
        message,
      },
    }

    // TODO: Trigger Email to Owner & Admin, SMS, Message, Push notification
    const res = await usersRef.set(newNotificationObj, { merge: true })
    functions.logger.log(res)

    return {
      error: false,
      message: 'Successfully notified!',
    }
  } catch (err) {
    // functions.logger.log(err)
    return notifyError(true, SERVER_ERROR)
  }
}
