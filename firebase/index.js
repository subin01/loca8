import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAmkO_iB6iyitJerKu4L_88VpALwi3r2oE',
  authDomain: 'loca8me.firebaseapp.com',
  projectId: 'loca8me',
  storageBucket: 'loca8me.appspot.com',
  messagingSenderId: '977760864834',
  appId: '1:977760864834:web:a7ad767300509a31b3bbdb',
})

const functions = firebase.app().functions('asia-south1')
const auth = app.auth()
const firestore = firebase.firestore()
// const functions =functions;

// if (location.hostname === 'localhost') {
//   auth.useEmulator('http://localhost:9099/');
//   firestore.useEmulator('localhost', 9090);
// }

const usersRef = firestore.collection('users')
const matchRef = firestore.collection('match')
let USER_UID = null // 'bm6Hg4vWy0YO93KeuUeSXN0Gr4J2';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    USER_UID = user.uid
  } else {
    return null
  }
})

const createGameProfileAPI = functions.httpsCallable('createGameProfile')
const createGameProfile = async (displayName) => createGameProfileAPI({ displayName })

const joinWaitingRoomAPI = functions.httpsCallable('joinWaitingRoom')
const joinWaitingRoom = async (matchId, matchType, multiplier) => joinWaitingRoomAPI({ matchId, matchType, multiplier })

const chooseTossAPI = functions.httpsCallable('chooseToss')
const chooseToss = async (gameroomId, team) => chooseTossAPI({ gameroomId, team })

const syncTeamSelectionAPI = functions.httpsCallable('syncTeamSelection')
const syncTeamSelection = async (gameroomId, selectedPlayer, teamId, timer) =>
  syncTeamSelectionAPI({ gameroomId, selectedPlayer, teamId, timer })

const syncTimerAPI = functions.httpsCallable('syncTimer')
const syncTimer = async (gameroomId, timer) => syncTimerAPI({ gameroomId, timer })

async function markHistoryAsSeen(USER_UID) {
  try {
    const res = await usersRef.doc(USER_UID).set({ gameHistoryToBeSeen: null }, { merge: true })
    console.log('Marked the History as see: ', res)
  } catch (err) {
    console.log(err)
  }
}

async function signOut(USER_UID) {
  console.log('signOut', USER_UID)
  try {
    const res = await usersRef.doc(USER_UID).set({ gameroomId: null }, { merge: true })
    console.log('signOut: ', res)
  } catch (err) {
    console.log(err)
  }
}

const getMatches = () => {
  return useCollectionData(matchRef)
}

function getUser(USER_UID) {
  // console.log('getUser id:', USER_UID);
  return useDocumentData(firestore.doc(`users/${USER_UID}`))
}

function getGameroom(gameroomId) {
  // console.log('getGameroom id:', gameroomId);
  return useDocumentData(firestore.doc(`gameRooms/${gameroomId}`))
}

export default {
  firebase,
  auth,
  createGameProfile,
  getUser,
  getMatches,
  getGameroom,
  joinWaitingRoom,
  syncTeamSelection,
  syncTimer,
  markHistoryAsSeen,
  signOut,
  chooseToss,
}

export default auth
