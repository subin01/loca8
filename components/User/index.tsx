// @ts-nocheck
import React, { useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { firebase, GetUser, createUserProfile } from '../../db'
import { useAuth } from '../../contexts/AuthContext'
import LoadingInline from '../LoadingInline'

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}

interface IProps {
  updateStep(step: number): void
}

export default function User({ updateStep }: IProps) {
  const { currentUser } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileRes, setProfileRes] = useState(null)

  const USER_UID = currentUser?.uid
  console.log('USER_UID', USER_UID)
  const [user, loadingUser, errorUser] = GetUser(USER_UID)

  async function handleCreateProfile() {
    setIsSubmitting(true)
    setProfileRes(null)
    const response = await createUserProfile({ displayName: currentUser.displayName, email: currentUser.email })
    setProfileRes(response.data)
    setIsSubmitting(false)
  }

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
          <h1>Authenticate yourself</h1>
          <p>Use one of the Sign in methods</p>
          <div className="signin-buttons">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
          <p>Don't worry, we will not gather any private information from your account</p>
        </div>
      )
    }
    return (
      <div className="loadingContainer">
        <div>
          <span>
            {user?.displayName && (
              <strong>
                Welcome {user?.displayName}!
                <br />
              </strong>
            )}
            You are now signed-in as <strong>{firebase.auth().currentUser?.email}</strong>
          </span>
          &nbsp;&nbsp;
          <button className="cta cta-small" onClick={(e) => handleLogout(e)}>
            Sign out
          </button>
          <hr></hr>
        </div>

        {loadingUser && (
          <LoadingInline>
            <span>Loading Your Account...</span>
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
          <span>Error Loading Your Account, Please try again...</span>
        </LoadingInline>
      )
    }
    if (!user) {
      return (
        <div className="profile-not-found loadingContainer">
          <h2>Seems like you are here for the fist time!</h2>
          <p>We cannot save your details without a account. So let's create one quickly!</p>
          <button className="cta" onClick={handleCreateProfile} disabled={isSubmitting}>
            Create Loca8 Account
          </button>

          <hr></hr>

          <h2>Had a Loca8 account before?</h2>
          <p>
            If you had Loca8 earlier, check if you used the same account/email for authentication. <br></br>Sign out and
            login with correct account.
          </p>
          {/* <pre>{JSON.stringify(currentUser)}</pre> */}

          {isSubmitting && <LoadingInline>Creating Loca8 Account...</LoadingInline>}

          {profileRes !== null && profileRes.error === true && <div className="message-box">{profileRes.message}</div>}
        </div>
      )
    }
  }

  return (
    <div className="loadingContainer">
      {renderLogin()}
      {currentUser && renderProfile()}
      {profileRes !== null && profileRes.error === false && (
        <div className="message-box">Loca8 Profile created for {user?.email}</div>
      )}
    </div>
  )
}
