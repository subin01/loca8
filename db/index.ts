import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { TagID, ITagVerifyResponse } from 'types'

let app, auth
if (!firebase.apps.length) {
  app = firebase.initializeApp({
    apiKey: 'AIzaSyAmkO_iB6iyitJerKu4L_88VpALwi3r2oE',
    authDomain: 'loca8me.firebaseapp.com',
    projectId: 'loca8me',
    storageBucket: 'loca8me.appspot.com',
    messagingSenderId: '977760864834',
    appId: '1:977760864834:web:a7ad767300509a31b3bbdb',
  })
}

const functions = firebase.app().functions('asia-south1')
const firestore = firebase.firestore()
// const functions =functions;

// if (location.hostname === 'localhost') {
//   auth.useEmulator('http://localhost:9099/');
//   firestore.useEmulator('localhost', 9090);
// }
interface UserProfile {
  displayName: string
  email: string
}
const createUserProfileAPI = functions.httpsCallable('createUserProfile')
const createUserProfile = async (data: UserProfile) => createUserProfileAPI(data)

interface Tag {
  tid: TagID
  notes: string
}

interface NewTag {
  key: string
  code: string
  notes: string
}
interface UpdateProfile {
  displayName: string
  email: string
  phone: number
  tags: [Tag]
  newTag: NewTag
}
const updateUserProfileAPI = functions.httpsCallable('updateUserProfile')
const updateUserProfile = async (data: UpdateProfile) => updateUserProfileAPI(data)

interface ValidateTag {
  tid: TagID
}
const verifyTagAPI = functions.httpsCallable('verifyTag')
const verifyTag = async (data: ValidateTag) => verifyTagAPI(data)

// TODO: Replace with callable
function GetUser(USER_UID: string) {
  // console.log('GetUser id:', USER_UID);
  return useDocumentData(firestore.doc(`users/${USER_UID}`))
}

export { firebase, createUserProfile, updateUserProfile, verifyTag, GetUser }
