import { useEffect } from 'react'
import { useAuth } from 'contexts/AuthContext'
import { useRouter } from 'next/router'

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter()

      const { currentUser } = useAuth()
      // If there is no access token we redirect to "Login" page.
      if (!currentUser) {
        Router.replace('/login')
        return <h1>Loading...</h1>
      }

      // If this is an accessToken we just render the component that was passed with all its props
      return <WrappedComponent {...props} />
    }

    // If we are on server, return null
    return null
  }
}

export default withAuth
