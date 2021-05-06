import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const SERVER_ERROR = 'server_error'
const TAG_INVALID = 'invalid'
const TAG_STATUS_REGISTERED = 'registered'
const TAG_STATUS_UNREGISTERED = 'unregistered'

!admin.apps.length ? admin.initializeApp() : admin.app()
const db = admin.firestore()

/**
 * createUserProfile
 * Create a new User profile from the UID
 * UID comes from auth, and profile details from the app
 * @param data
 * @param context
 */
export async function notifyOwner(data: any, context: any) {
  functions.logger.log('----------notifyOwner ', data, context)

  const tid = data?.tid
  if (!tid) return { error: true, message: 'Invalid Tag ID!', errorType: TAG_INVALID }

  try {
    const tagsRef = db.collection('tags').doc(tid.trim())
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
