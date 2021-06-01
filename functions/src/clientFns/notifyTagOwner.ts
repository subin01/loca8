/* eslint-disable no-unused-vars */
/* @ts-nocheck */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'

import { returnSMS } from './sendMessage'
import { validateTagFormat } from '../utils'
import { iNotifyOwnerErrorTypes } from '../types'
import {
  SERVER_ERROR,
  TAG_INVALID,
  TAG_STATUS_REGISTERED,
  TAG_STATUS_UNREGISTERED,
  ADMIN_EMAIL,
} from '../global_constants'
import { htmlEmail } from '../templates'

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
    message: string = 'Error: Please try again!',
    smsResponse?: object
  ) => {
    return {
      error,
      errorType,
      message,
      smsResponse,
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
    const tagsRef = db.collection('tags').doc(tid)
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

    /* Notification Data */
    const ownerData = doc.data()
    const ownerEmail = ownerData?.email
    const ownerMobile = ownerData?.phone
    const tagName = ownerData?.notes
    const displayName = ownerData?.displayName
    const returns = ownerData?.returns || {}

    const objId = uuidv4()
    const newReturn = {
      [objId]: {
        tid,
        name,
        phone,
        email,
        message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      },
    }
    const updatedNotifications = {
      returns: { ...returns, ...newReturn },
    }

    /* Email Data */
    const mailRef = db.collection('mail')
    const newMailRef = mailRef.doc()
    const mailType = 'return'
    const emailData = {
      to: ownerEmail,
      cc: ADMIN_EMAIL,
      message: {
        subject: 'Loca8 | Your Tag is found!',
        html: htmlEmail({ template: mailType, tid, displayName, name, email, phone, message }),
        text: `Hello! Your tag (${tid}) is reported to be found!`,
      },
      type: mailType,
      uid, // Not needed for email, only for linking
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Not needed for email, only for sorting
    }

    /* Send SMS notification */
    const smsResponse = await returnSMS({ to: ownerMobile, phone, name, tagName })

    /* All DB Operations */
    const res = await db.runTransaction(async (transaction) => {
      transaction.set(newMailRef, emailData, { merge: true })
      // TODO: Trigger Email Admin, SMS, Message, Push notification
      transaction.set(usersRef, updatedNotifications, { merge: true })
    })

    functions.logger.log(res)

    return {
      error: false,
      message: 'Successfully notified!',
      smsResponse,
    }
  } catch (err) {
    // functions.logger.log(err)
    return notifyError(true, SERVER_ERROR)
  }
}
