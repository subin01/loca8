import Head from 'next/head'

import Header from 'components/Header'
import Footer from 'components/Footer'
import User from 'components/User'

import styles from 'styles/Home.module.scss'
import { useRouter } from 'next/router'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { firebase } from 'firebase'
// import { useAuth } from 'contexts/AuthContext'

export default function Register() {
  const router = useRouter()
  const id = router.query.id
  // const { user, loading, signout } = useAuth()
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
            {/* <div style={{ overflow: 'hidden', maxWidth: '50rem' }}>Logged in as: {JSON.stringify(user)}</div> */}

            <User />

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
