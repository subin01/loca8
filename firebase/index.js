import firebase from 'firebase/app'
import 'firebase/auth' // If you need it
import 'firebase/firestore' // If you need it

const clientCredentials = {
  apiKey: 'AIzaSyAmkO_iB6iyitJerKu4L_88VpALwi3r2oE',
  authDomain: 'loca8me.firebaseapp.com',
  projectId: 'loca8me',
  storageBucket: 'loca8me.appspot.com',
  messagingSenderId: '977760864834',
  appId: '1:977760864834:web:a7ad767300509a31b3bbdb',
}

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
  // Check that `window` is in scope for the analytics module!
  // if (typeof window !== 'undefined') {
  //   // Enable analytics. https://firebase.google.com/docs/analytics/get-started
  //   if ('measurementId' in clientCredentials) {
  //     firebase.analytics()
  //     firebase.performance()
  //   }
  // }
}

export default firebase
