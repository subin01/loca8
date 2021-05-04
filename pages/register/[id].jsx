import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'
import User from '@components/User'
import RegisterForm from '@components/RegisterForm'

import styles from 'styles/Home.module.scss'
import { useRouter } from 'next/router'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { firebase } from 'db'
import { useAuth } from 'contexts/AuthContext'
import { GetUser } from 'db'

export default function Register() {
  const router = useRouter()
  const id = router.query.id
  const { currentUser } = useAuth()
  // TODO: Replcae GetUser with callable
  const [user, loadingUser, errorUser] = GetUser(currentUser?.uid)

  return (
    <>
      <Head></Head>
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

          <div className="box">
            <h2>Step 1: Sign in</h2>
            {/* <div style={{ overflow: 'hidden', maxWidth: '50rem' }}>Logged in as: {JSON.stringify(user)}</div> */}
            <User />
          </div>
          <RegisterForm tid={id} user={user} />
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
