/* eslint-disable no-unused-vars */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { activateTag } from './activateTag'

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
  const newTag = data?.newTag || {}

  functions.logger.log(':::::updateProfile::v1:: ', displayName, uid, data)

  if (!uid) return profileError('Account not found, Try re-login!')

  try {
    const usersRef = db.collection('users').doc(uid)
    const doc = await usersRef.get()
    if (!doc.exists) {
      return profileError('User not found!')
    }

    const userData = doc.data()
    const currentTags = userData?.tags || {}

    const newUserObj = {
      uid,
      displayName,
      phone,
      email,
    }

    let activationResponse
    let activatedTag = {}
    if (newTag !== {}) {
      const activateFnRes = await activateTag(newTag.tid, newTag.key, uid, email, displayName)
      if (!activateFnRes?.error) {
        // ie. Tag & Activation key was valid
        activatedTag = { [newTag.tid]: { ...newTag, activatedOn: admin.firestore.FieldValue.serverTimestamp() } }
      }
      activationResponse = activateFnRes
    }

    const res = await usersRef.set(
      {
        ...newUserObj,
        tags: { ...currentTags, ...activatedTag }, // merge = true
      },
      { merge: true }
    )
    functions.logger.log(res)

    return {
      error: false,
      message: 'Success!',
      details: 'User profile updated!',
      activation: {
        ...activationResponse,
      },
    }
  } catch (err) {
    functions.logger.log(err)
    return profileError(err)
  }
}
