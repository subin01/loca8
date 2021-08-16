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
    setProfileRes(null)
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
          <h2>Authenticate yourself</h2>
          {/* <p>Use one of the Sign in methods</p> */}
          <div className="signin-buttons">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
          <p>Don't worry, we will not gather any private information from your account</p>
        </div>
      )
    }
    return (
      <div className="loadingContainer">
        <div className="user-info">
          <div>
            {user?.displayName && (
              <strong>
                Welcome {user?.displayName}!
                <br />
              </strong>
            )}
            You are signed-in as <strong>{firebase.auth().currentUser?.email}</strong>
            <br />
            {user?.phone && (
              <>
                Your phone number is <strong>{user?.phone}</strong>
              </>
            )}
          </div>
          <button className="cta cta-small" onClick={(e) => handleLogout(e)}>
            Sign out
          </button>
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
        <div className="loadingContainer">
          <div className="profile-not-found">
            <h2>Seems like you are here for the fist time!</h2>
            <p>We cannot save your details without a account. So let's create one quickly!</p>
            <button className="cta" onClick={handleCreateProfile} disabled={isSubmitting}>
              Create Loca8 Account
            </button>
          </div>

          <div className="message-box icon-info marginTop1 profile-wrong">
            <h2>Had a Loca8 account before?</h2>
            <p>
              If you had a Loca8 account earlier, check if you are using the same account/email for authentication. Sign
              out and login with the correct account, otherwise.
            </p>
          </div>
          {/* <pre>{JSON.stringify(currentUser)}</pre> */}

          {isSubmitting && <LoadingInline>Creating Loca8 Account...</LoadingInline>}

          {profileRes !== null && profileRes.error === true && (
            <div className="message-box icon-error">{profileRes.message}</div>
          )}
        </div>
      )
    }
  }

  return (
    <div className="loadingContainer">
      {renderLogin()}
      {currentUser && renderProfile()}
      {profileRes !== null && profileRes.error === false && (
        <div className="message-box icon-check">Yay! Loca8 Profile created for {user?.email}</div>
      )}
    </div>
  )
}
