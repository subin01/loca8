import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'

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
  auth = app.auth()
}

const functions = firebase.app().functions('asia-south1')
const firestore = firebase.firestore()
// const functions =functions;

// if (location.hostname === 'localhost') {
//   auth.useEmulator('http://localhost:9099/');
//   firestore.useEmulator('localhost', 9090);
// }

const usersRef = firestore.collection('users')
let USER_UID = null // 'bm6Hg4vWy0YO93KeuUeSXN0Gr4J2';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    USER_UID = user.uid
  } else {
    return null
  }
})

const createUserProfileAPI = functions.httpsCallable('createUserProfile')
const createUserProfile = async (data) => {
  console.log('!!createUserProfile', data.displayName)
  createUserProfileAPI(data)
}

const updateUserProfileAPI = functions.httpsCallable('updateUserProfile')
const updateUserProfile = async (data) => updateUserProfileAPI(data)

async function signOut(USER_UID) {
  console.log('signOut', USER_UID)
  try {
    console.log('signOut: ', res)
  } catch (err) {
    console.log(err)
  }
}

function getUser(USER_UID) {
  // console.log('getUser id:', USER_UID);
  return useDocumentData(firestore.doc(`users/${USER_UID}`))
}

export { app, firebase, auth, createUserProfile, updateUserProfile, getUser, signOut }
