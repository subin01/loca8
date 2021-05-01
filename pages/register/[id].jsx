import Head from 'next/head'

import Header from 'components/Header'
import Footer from 'components/Footer'

import styles from 'styles/Home.module.scss'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

let app
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
let USER_UID = null
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    USER_UID = user.uid
  } else {
    return null
  }
})

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}

export default function Register() {
  const router = useRouter()
  const id = router.query.id
  // const [user, loading, error] = useAuthState(app.auth())

  return (
    <>
      <Head>
        <title>Loca8 | Locate the owner</title>
        <meta name="description" content="Locate the owner" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,700;1,300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header></Header>

      <div className={styles.container}>
        <main>
          <h1>Yay! Let's tag it</h1>
          <h2>Let's add some details, so it can find it way back you!</h2>

          {id && (
            <div className={styles.card}>
              <pre>TAG ID: {id}</pre>
            </div>
          )}
          <hr></hr>

          <div>
            <h2>Step 1: Create an account</h2>
            {/* <div className={styles.card}>Login --{JSON.stringify(user)}--</div> */}
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

            <h2>Step 2: Add some details</h2>
            <p>So we can contact you in case of a lost & found situation. This will NOT leave our system!</p>
            <form className="form">
              {!id && (
                <fieldset>
                  <label htmlFor="tag">Tag ID:</label>
                  <input id="tag" value={id}></input>
                </fieldset>
              )}
              <fieldset>
                <label htmlFor="mobile">Mobile</label>
                <input id="mobile" type="tel"></input>
              </fieldset>
              <fieldset>
                <label htmlFor="email">Email</label>
                <input id="email" type="email"></input>
              </fieldset>
              <fieldset>
                <label htmlFor="name">
                  Your name <span>(optional)</span>
                </label>
                <input id="name"></input>
              </fieldset>
              <fieldset>
                <label htmlFor="notes">
                  Notes <span>(optional)</span>
                </label>
                <input id="notes"></input>
                <span className="helperText">Example: My second set of keys for apartment</span>
              </fieldset>
              <button type="submit" className="cta">
                Save Details
              </button>
            </form>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
