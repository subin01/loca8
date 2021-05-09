/* eslint-disable no-unused-vars */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { SERVER_ERROR, TAG_INVALID, TAG_STATUS_REGISTERED, TAG_STATUS_UNREGISTERED } from './global_constants'

!admin.apps.length ? admin.initializeApp() : admin.app()
const db = admin.firestore()

/**
 * createUserProfile
 * Create a new User profile from the UID
 * UID comes from auth, and profile details from the app
 * @param data
 * @param context
 */
export async function createUserProfile(data: any, context: any) {
  const profileError = (details = 'Please try again.') => {
    return {
      error: true,
      message: 'Profile creation failed!',
      details,
    }
  }

  const email = data?.email
  const displayName = data?.displayName || 'no name'
  const uid = context.auth?.uid

  functions.logger.log(':::::createUserProfile::v1:: ', displayName, uid)

  if (!uid) return profileError('Account not found, Try re-login')

  const newUserObj = {
    uid: uid,
    displayName,
    email,
    tags: [],
  }

  try {
    const usersRef = db.collection('users').doc(uid)
    const doc = await usersRef.get()
    if (doc.exists) {
      const userData = doc.data()
      return profileError(`User profile exists with: ${userData?.displayName} - ${userData?.email}!`)
    }
    const newUsersRef = db.collection('users')
    const res = await newUsersRef.doc(uid).set(newUserObj, { merge: true })
    functions.logger.log(res)

    return {
      error: false,
      message: 'Success!',
      details: 'User profile created!',
    }
  } catch (err) {
    functions.logger.log(err)
    return profileError()
  }
}

/**
 * activateTag
 * Check if the Tag ID & Activation key provided is valid or not
 * If valid, removes the key from the pool.
 * @param tid
 * @param key
 * @param uid
 */
async function activateTag(
  tid: string,
  key: string,
  uid: string
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

    const res = await db.runTransaction(async (transaction) => {
      transaction.set(tagsRef, updatedTagsData, { merge: true })
      transaction.delete(keysRef)
    })

    functions.logger.log('Transaction finished: ', res)
    return { error: false, message: 'Activation completed!' }
  } catch (err) {
    functions.logger.log(err)
    return { error: true, message: err }
  }
}

/**
 * updateUserProfile
 * Update User profile with Contact & Tag details
 * @param data
 * @param context
 */
export async function updateUserProfile(data: any, context: any) {
  const profileError = (details = 'Please try again.') => {
    return {
      error: true,
      message: 'Profile update failed!',
      details,
    }
  }

  const uid = context.auth?.uid
  const email = data?.email
  const displayName = data?.displayName || 'no name'
  const phone = data?.phone
  const newTag = data?.newTag
  const tags = data?.tags || []

  functions.logger.log(':::::updateProfile::v1:: ', displayName, uid, data)

  if (!uid) return profileError('Account not found, Try re-login!')

  try {
    const usersRef = db.collection('users').doc(uid)
    const doc = await usersRef.get()
    if (!doc.exists) {
      return profileError('User not found!')
    }

    let newUserObj = {
      uid,
      displayName,
      phone,
      email,
      tags,
    }

    const activationRes = await activateTag(newTag?.tid, newTag?.key, uid)
    if (!activationRes.error) {
      // ie. Tag & Activation key was valid
      newUserObj = {
        uid,
        displayName,
        phone,
        email,
        tags: [...tags, newTag], // merge the new Tag
      }
    }

    const res = await usersRef.set(newUserObj, { merge: true })
    functions.logger.log(res)

    return {
      error: false,
      message: 'Success!',
      details: 'User profile updated!',
      activation: {
        ...activationRes,
      },
    }
  } catch (err) {
    functions.logger.log(err)
    return profileError(err)
  }
}

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
