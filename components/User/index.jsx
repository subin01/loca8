import React, { useEffect, useState } from 'react'
import { getUser, signOut, createGameProfile } from 'fire'
import { firebase, useAuth } from 'contexts/AuthContext'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Link from 'next/link'
import Loading from 'components/Loading'
import Card from 'components/Card'
// import './index.scss'

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

export default function User() {
  // const [currentUser, setCurrentUser] = useState({}) // Local signed-in state.
  const { currentUser, logout, auth } = useAuth()

  const USER_UID = currentUser?.uid
  console.log('USER_UID', USER_UID)
  const [user, loadingUser, errorUser] = getUser(USER_UID)

  // // Listen to the Firebase Auth state and set the local state.
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((currUser) => {
  //     // setCurrentUser(currUser)
  //   })
  //   return () => unsubscribe() // Make sure we un-register Firebase observers when the component unmounts.
  // }, [])

  async function handleLogout(e) {
    e.preventDefault()
    try {
      await firebase.auth().signOut()
    } catch {
      console.log('Failed to log out')
    }
  }

  const renderLogin = () => {
    if (!currentUser) {
      return (
        <div>
          <h1>Please sign in!</h1>
          <p>Use one of the Sign in methods</p>
          <hr />
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      )
    }
    return (
      <div>
        <h1>Welcome! </h1>
        <button onClick={(e) => handleLogout(e)}>Logout</button>
        <p>{firebase.auth().currentUser?.email} You are now signed-in!</p>
        {loadingUser && (
          <Loading>
            <h1>Loading Your Profile...</h1>
          </Loading>
        )}
      </div>
    )
  }

  const renderProfile = () => {
    if (loadingUser) {
      return (
        <Loading>
          <h1>Loading Your Profile...</h1>
        </Loading>
      )
    }
    if (errorUser) {
      return (
        <Loading>
          <h1>Error Loading Your Profile, Please try again...</h1>
        </Loading>
      )
    }
    if (!user) {
      return (
        <Card className="profile-not-found">
          <h1>Game Profile not found!</h1>
          <p>We cannot save your new game or fetch your past games without a Game Profile</p>
          <br></br>
          <button className="cta" onClick={() => createGameProfile(user.displayName)}>
            Create a Profile
          </button>
          <hr></hr>
          <h3>What happened to my last profile?</h3>
          <p>If you were using social media login then...</p>
          <ul>
            <li>Make sure you are using the same one as last time, and</li>
            <li>Same account as last time</li>
          </ul>
          <p>If you were using an anonymous login then...</p>
          <ul>
            <li>You're in a new device or browser, or</li>
            <li>You logged out from your session, or</li>
            <li>Your session is timed out</li>
          </ul>
        </Card>
      )
    }
    if (user) {
      return (
        <Card>
          <h1>Your Profile is ready!</h1>
          <br />
          <div className="actions">
            <Link href="/game" className="cta">
              Start Playing!
            </Link>
            <Link href="/profile">View Profile</Link>
            &bull;
            <Link href="/">Homepage</Link>
          </div>
        </Card>
      )
    }
  }

  return (
    <div className="">
      <section className="user-profile">
        {renderLogin()}
        {currentUser && renderProfile()}
      </section>
    </div>
  )
}
