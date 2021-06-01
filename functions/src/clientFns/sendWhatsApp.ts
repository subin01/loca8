/* eslint-disable no-unused-vars, spaced-comment, new-cap */
import * as functions from 'firebase-functions'
const twilio = require('twilio')

export async function welcomeWhatsApp({ to, tid }: { to: string; tid: string }): Promise<object> {
  const body = `Your Loca8 Tag ID is ${tid}`

  const response = await sendWhatsApp(to, body)
  return response
}

export async function returnWhatsApp({
  to,
  tid,
  phone,
  name,
  email,
}: {
  to: string
  tid: string
  phone?: string
  name?: string
  email?: string
}): Promise<object> {
  const body = `Loca8 Tag reported to be found: ${tid}`

  const response = await sendWhatsApp(to, body)
  return response
}

async function sendWhatsApp(to: string, body: string) {
  const accountSid = functions.config().twilio.account_sid
  const authToken = functions.config().twilio.auth_token
  const client = new twilio(accountSid, authToken)

  // const messagingServiceSid = 'MG89ff88e0a0a2fb6814dccd9e2b490a96' // first-service
  try {
    const message = await client.messages.create({
      body,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:+91${to}`,
    })
    functions.logger.log('------ sendWhatsApp: ', to, body, message)
    const { status, sid } = message
    return { status, sid }
  } catch (error) {
    return error
  }
}
