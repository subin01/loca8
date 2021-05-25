/* eslint-disable no-unused-vars */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { TAG_STATUS_REGISTERED } from '../global_constants'
import { htmlEmail } from '../templates'

!admin.apps.length ? admin.initializeApp() : admin.app()
const db = admin.firestore()

/**
 * activateTag
 * Check if the Tag ID & Activation key provided is valid or not
 * If valid, removes the key from the pool.
 * @param tid
 * @param key
 * @param uid
 */
export async function activateTag(
  tid: string,
  key: string,
  uid: string,
  email: string,
  displayName: string
): Promise<{ error: boolean; message: string; errorField?: string }> {
  try {
    const tagsRef = db.collection('tags').doc(tid.trim())
    const tdoc = await tagsRef.get()

    if (!tdoc.exists) {
      functions.logger.log(`Invalid Tag TID: --${tid}--`)
      return { error: true, message: 'Invalid Tag!', errorField: 'tid' }
    }

    const tagData = tdoc.data()
    const tagStatus = tagData?.status || ''
    const tagUid = tagData?.uid || ''

    if (tagStatus === TAG_STATUS_REGISTERED) {
      functions.logger.log('Tag already active: ', tagData)
      if (tagUid === uid) {
        return { error: true, message: 'Tag already registered to this Profile!', errorField: 'tid' }
      }
      return { error: true, message: 'Tag already in use!', errorField: 'tid' }
    }

    const keysRef = db.collection('keys').doc(key.trim())
    const kdoc = await keysRef.get()

    if (!kdoc.exists) {
      functions.logger.log(`Invalid Activation Key: --${key}--`)
      return { error: true, message: 'Invalid Activation Key!', errorField: 'key' }
    }

    const updatedTagsData = {
      status: TAG_STATUS_REGISTERED,
      uid,
      key,
      activatedOn: admin.firestore.FieldValue.serverTimestamp(),
    }

    /* Email Notification     */
    const mailRef = db.collection('mail')
    const newMailRef = mailRef.doc()
    const mailType = 'activation'
    const emailData = {
      to: email,
      message: {
        subject: 'Loca8 | Tag activated!',
        html: htmlEmail({ template: mailType, displayName, tid, key }),
        text: `Hello ${displayName}! Your tag (${tid}) is successfully activated!`,
      },
      uid, // Not needed for email, only for linking
      type: mailType,
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Not needed for email, only for sorting
    }

    /* All DB Operations */
    const res = await db.runTransaction(async (transaction) => {
      transaction.set(tagsRef, updatedTagsData, { merge: true })
      transaction.delete(keysRef)
      transaction.set(newMailRef, emailData, { merge: true })
    })

    functions.logger.log('Transaction finished: ', res)
    return { error: false, message: 'Activation completed!' }
  } catch (err) {
    functions.logger.log(err)
    return { error: true, message: err }
  }
}
