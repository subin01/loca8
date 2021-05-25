/* eslint-disable no-unused-vars, spaced-comment,  */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { SERVER_ERROR, TAG_INVALID, TAG_STATUS_UNREGISTERED, TAG_STATUS_REGISTERED } from '../global_constants'

!admin.apps.length ? admin.initializeApp() : admin.app()
const db = admin.firestore()

/**
 * verifyTag
 * Check if the Tag ID  provided is valid or not
 * If valid, Show if there's any public message associated to it.
 * @param tid
 */
export async function verifyTag(data: any, context: any) {
  const tid = data?.tid
  if (!tid) return { error: true, message: 'Invalid Tag ID!', errorType: TAG_INVALID }

  try {
    const tagsRef = db.collection('tags').doc(tid)
    const tdoc = await tagsRef.get()

    if (!tdoc.exists) {
      functions.logger.log(`Invalid Tag TID: --${tid}--`)
      return { error: true, message: 'Invalid Tag!', errorType: TAG_INVALID }
    }

    const tagData = tdoc.data()
    const tagStatus = tagData?.status || ''
    const tagMessage = tagData?.message || ''

    if (tagStatus !== TAG_STATUS_REGISTERED) {
      return { error: true, message: 'Unregistered Tag!', errorType: TAG_STATUS_UNREGISTERED }
    }

    // Valid Tag!
    return { error: false, message: tagMessage }
  } catch (err) {
    functions.logger.log(err)
    return { error: true, message: err, errorType: SERVER_ERROR }
  }
}
