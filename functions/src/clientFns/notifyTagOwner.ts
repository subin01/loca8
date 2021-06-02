/* eslint-disable no-unused-vars */
/* @ts-nocheck */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'

// import { returnSMS } from './sendMessage'
import { validateTagFormat, trimName, trimTagname } from '../utils'
import { iNotifyOwnerErrorTypes } from '../types'
import {
  SERVER_ERROR,
  TAG_INVALID,
  TAG_STATUS_REGISTERED,
  TAG_STATUS_UNREGISTERED,
  ADMIN_EMAIL,
  MESSAGE_TYPE_RETURN,
  MESSAGE_CHANNEL_EMAIL,
  MESSAGE_CHANNEL_SMS,
  MSGBIRD_SMS_CHANNEL,
  MSGBIRD_SMS_SENDER,
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
    errorField?: string
  ) => {
    return {
      error,
      errorType,
      message,
      errorField,
    }
  }

  const tid = data?.tid
  const name = data?.name
  const phone = data?.phone
  const email = data?.email || ''
  const message = data?.message || ''

  functions.logger.log(':::::notifyTagOwner:::: ', data)

  if (!tid || !validateTagFormat(tid)) {
    return notifyError(true, TAG_INVALID, 'Invalid Tag Format!', 'tid')
  }

  if (!name || name.length < 3 || name.length > 15) {
    return notifyError(true, TAG_INVALID, 'Invalid name!', 'name')
  }

  if (!phone || phone.length !== 10) {
    return notifyError(true, TAG_INVALID, 'Invalid phone!', 'phone')
  }

  try {
    const tagsRef = db.collection('tags').doc(tid)
    const tdoc = await tagsRef.get()

    if (!tdoc.exists) {
      functions.logger.log(`Invalid Tag TID: --${tid}--`)
      return notifyError(true, TAG_INVALID, 'Invalid Tag!', 'tid')
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
    const tagName = ownerData?.tags?.[tid]?.notes || tid
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

    /* Email Notification ********************************************/
    const mailRef = db.collection('mail')
    const newMailRef = mailRef.doc()
    const emailData = {
      to: ownerEmail,
      cc: ADMIN_EMAIL,
      message: {
        subject: 'Loca8 | Your Tag is found!',
        html: htmlEmail({ template: MESSAGE_TYPE_RETURN, tid, displayName, name, email, phone, message }),
        text: `Hello! Your tag (${tid}) was reported as found!`,
      },
      // Additional attributes for linking/tracking
      uid,
      tid,
      messageType: MESSAGE_TYPE_RETURN,
      messageChannel: MESSAGE_CHANNEL_EMAIL,
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Not needed for email, only for sorting
    }

    /* SMS notification ********************************************/
    // const smsResponse = await returnSMS({ to: ownerMobile, phone, name, tagName }   // TwilioSMS
    const tagNameTrimmed = trimTagname(tagName)
    const nameTrimmed = trimName(name)

    // prettier-ignore
    const text =
`Hey!
Your Loca8 tag for "${tagNameTrimmed}" was reported as found!
Contact "${nameTrimmed}" at ${phone}.
Check your email for more info.`

    const messageRef = db.collection('messages')
    const newMessageRef = messageRef.doc()
    const messageData = {
      channelId: MSGBIRD_SMS_CHANNEL,
      originator: MSGBIRD_SMS_SENDER,
      type: 'text',
      to: `+91${ownerMobile}`,
      content: {
        text,
      },
      // Additional attributes for linking/tracking
      uid,
      tid,
      messageType: MESSAGE_TYPE_RETURN,
      messageChannel: MESSAGE_CHANNEL_SMS,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    }

    /* All DB Operations */
    const response = await db.runTransaction(async (transaction) => {
      transaction.set(newMailRef, emailData, { merge: true })
      transaction.set(usersRef, updatedNotifications, { merge: true })
      transaction.set(newMessageRef, messageData, { merge: true })
    })

    functions.logger.log('Transaction finished: ', response)

    return {
      error: false,
      message: 'Successfully notified!',
    }
  } catch (err) {
    functions.logger.log('::::notifyTagOwner:::: ', err)
    return notifyError(true, SERVER_ERROR)
  }
}
