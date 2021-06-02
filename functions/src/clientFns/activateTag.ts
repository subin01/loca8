/* eslint-disable no-unused-vars */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// import { welcomeSMS } from './sendMessage'
import { validateKeyFormat, validateTagFormat, trimName, trimTagname } from '../utils'
import {
  TAG_STATUS_REGISTERED,
  MESSAGE_TYPE_ACTIVATION,
  MESSAGE_CHANNEL_EMAIL,
  MESSAGE_CHANNEL_SMS,
  MSGBIRD_SMS_CHANNEL,
  MSGBIRD_SMS_SENDER,
} from '../global_constants'
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
export async function activateTag({
  tid,
  key,
  notes,
  uid,
  phone,
  email,
  displayName,
}: {
  tid: string
  key: string
  notes: string
  uid: string
  phone: string
  email: string
  displayName: string
}): Promise<{ error: boolean; message: string; errorField?: string }> {
  if (!validateKeyFormat(key)) {
    functions.logger.log(`Invalid Activation Key (format): --${key}--`)
    return { error: true, message: 'Invalid Activation Key!', errorField: 'key' }
  }

  if (!validateTagFormat(tid)) {
    functions.logger.log(`Invalid TID Key (format): --${tid}--`)
    return { error: true, message: 'Invalid Tag!', errorField: 'tid' }
  }

  try {
    const tagsRef = db.collection('tags').doc(tid)
    const tdoc = await tagsRef.get()

    if (!tdoc.exists) {
      functions.logger.log(`Invalid Tag TID (no entry): --${tid}--`)
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

    const keysRef = db.collection('keys').doc(key)
    const kdoc = await keysRef.get()

    if (!kdoc.exists) {
      functions.logger.log(`Invalid Activation Key (no entry): --${key}--`)
      return { error: true, message: 'Invalid Activation Key!', errorField: 'key' }
    }

    const updatedTagsData = {
      status: TAG_STATUS_REGISTERED,
      uid,
      key,
      activatedOn: admin.firestore.FieldValue.serverTimestamp(),
    }

    /* Email Notification ********************************************/
    const mailRef = db.collection('mail')
    const newMailRef = mailRef.doc()
    const emailData = {
      to: email,
      message: {
        subject: 'Loca8 | Tag activated!',
        html: htmlEmail({ template: MESSAGE_TYPE_ACTIVATION, displayName, phone, tid, key }),
        text: `Hello ${displayName}! Your tag ${tid} is successfully activated!`,
      },
      // Additional attributes for linking/tracking
      uid,
      tid,
      messageType: MESSAGE_TYPE_ACTIVATION,
      messageChannel: MESSAGE_CHANNEL_EMAIL,
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Not needed for email, only for sorting
    }

    /* SMS notification ********************************************/
    // const smsResponse = await welcomeSMS({ to: phone, tid }) // TwilioSMS
    const nameTrimmed = trimName(displayName)
    const tagNameTrimmed = trimTagname(notes)

    // prettier-ignore
    const text =
`Hi ${nameTrimmed},
Your Loca8 Tag ${tid} "${tagNameTrimmed}" is activated!`

    const messageRef = db.collection('messages')
    const newMessageRef = messageRef.doc()
    const messageData = {
      channelId: MSGBIRD_SMS_CHANNEL,
      originator: MSGBIRD_SMS_SENDER,
      type: 'text',
      to: `+91${phone}`,
      content: {
        text,
      },
      // Additional attributes for linking/tracking
      uid,
      tid,
      messageType: MESSAGE_TYPE_ACTIVATION,
      messageChannel: MESSAGE_CHANNEL_SMS,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    }

    /* All DB Operations */
    const response = await db.runTransaction(async (transaction) => {
      transaction.set(tagsRef, updatedTagsData, { merge: true })
      transaction.delete(keysRef)
      transaction.set(newMailRef, emailData, { merge: true })
      transaction.set(newMessageRef, messageData, { merge: true })
    })

    functions.logger.log('Transaction finished: ', response)
    return { error: false, message: 'Activation completed!' }
  } catch (err) {
    functions.logger.log('::::activateTag:::: ', err)
    return { error: true, message: err }
  }
}
