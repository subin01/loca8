import React, { useEffect, useState } from 'react'
import { firebase, GetUser, createUserProfile } from 'db'
import { useAuth } from 'contexts/AuthContext'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import LoadingInline from '@components/LoadingInline'
import Card from '@components/Card'
// import './index.scss'

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
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
  const [user, loadingUser, errorUser] = GetUser(USER_UID)

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
          <h3>Please sign in!</h3>
          <p>Use one of the Sign in methods</p>
          <hr />
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      )
    }
    return (
      <div className="loadingContainer">
        <p>
          You are now signed-in with {firebase.auth().currentUser?.email}{' '}
          <button onClick={(e) => handleLogout(e)}>Sign out</button>
        </p>

        {loadingUser && (
          <LoadingInline>
            <span>Loading Your Profile...</span>
          </LoadingInline>
        )}
      </div>
    )
  }

  const renderProfile = () => {
    if (loadingUser) {
      return (
        <LoadingInline>
          <span>Verifying Your Sign-In...</span>
        </LoadingInline>
      )
    }
    if (errorUser) {
      return (
        <LoadingInline>
          <span>Error Loading Your Profile, Please try again...</span>
        </LoadingInline>
      )
    }
    if (!user) {
      return (
        <Card className="profile-not-found">
          <hr></hr>
          <h3>Loca8 Profile not found!</h3>
          {/* <pre>{JSON.stringify(currentUser)}</pre> */}
          <p>We cannot save your details without a profile</p>
          <br></br>
          <button
            className="cta"
            onClick={() => createUserProfile({ displayName: currentUser.displayName, email: currentUser.email })}
          >
            Create a Profile
          </button>
        </Card>
      )
    }
  }

  return (
    <div className="">
      <section className="loadingContainer">
        {renderLogin()}
        {currentUser && renderProfile()}
      </section>
    </div>
  )
}
