import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'

import styles from 'styles/Home.module.scss'
import { useRouter } from 'next/router'

export default function Return() {
  const router = useRouter()
  const id = router.query.id
  return (
    <>
      <Head></Head>

      <Header></Header>

      <div className={styles.container}>
        <main>
          <h1>Wow! You found it!</h1>
          <h2>Looks like you found this tag, let us help the owner to get it back!</h2>

          {id && (
            <div className={styles.card}>
              <pre>TAG ID: {id}</pre>
            </div>
          )}
          <hr></hr>

          <div>
            <h2>Just provide your details to reach you.</h2>
            <h3></h3>
            <form className="form">
              {!id && (
                <fieldset>
                  <label htmlFor="tag">Tag ID:</label>
                  <input id="tag" value={id}></input>
                </fieldset>
              )}
              <fieldset>
                <label htmlFor="mobile">Phone/Mobile</label>
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
                <textarea id="notes"></textarea>
              </fieldset>
              <button type="submit" className="cta">
                Notify the Owner
              </button>
            </form>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
