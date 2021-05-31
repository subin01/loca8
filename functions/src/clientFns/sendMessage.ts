/* eslint-disable no-unused-vars, spaced-comment, new-cap */
import * as functions from 'firebase-functions'
const twilio = require('twilio')

import { SERVER_ERROR } from '../global_constants'

export async function welcomeSMS({ to, tid }: { to: string; tid: string }): Promise<object> {
  const body = `Hi, Your Tag ${tid} is activated!
   Please save this number in your contacts for any future notifications.`

  const response = await sendSMS(to, body)
  return response
}

export async function returnSMS({
  to,
  tid,
  phone,
  name,
  email,
}: {
  to: string
  tid: string
  phone: string
  name: string
  email: string
}): Promise<object> {
  const body = `Hey! Your Loca8 Tag ${tid} reported to be found by someone!
  Try reaching ${name} at ${phone}${email && ' or ' + email}`

  const response = await sendSMS(to, body)
  return response
}

async function sendSMS(to: string, body: string) {
  const accountSid = functions.config().twilio.account_sid
  const authToken = functions.config().twilio.auth_token
  const client = new twilio(accountSid, authToken)

  const messagingServiceSid = 'MG89ff88e0a0a2fb6814dccd9e2b490a96' // first-service
  try {
    const message = await client.messages.create({
      body,
      messagingServiceSid,
      to,
    })
    functions.logger.log('------ sendSMS: ', to, body, message)
    const { status, errorCode } = message
    return { status, errorCode }
  } catch (error) {
    return error
  }
}

/**
 * sendMessage
 * Check if the Tag ID  provided is valid or not
 * If valid, Show if there's any public message associated to it.
 */
export async function sendMessage(data: any, context: any) {
  const type = data?.type || 'WELCOME'
  const to = data?.to || '+919961995596'
  const tid = data?.tid || '8888-1111'
  const phone = data?.phone || '+919900009900'
  const name = data?.name
  const email = data?.email

  functions.logger.log('####### sendMessage ##### Args: ', data)

  try {
    if (type === 'WELCOME') {
      const resp = await welcomeSMS({ to, tid })
      return { error: false, message: resp }
    } else {
      const resp = await returnSMS({ to, tid, phone, name, email })
      return { error: false, message: resp }
    }
  } catch (err) {
    functions.logger.log(err)
    return { error: true, message: err, errorType: SERVER_ERROR }
  }
}
