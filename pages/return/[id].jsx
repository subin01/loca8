import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'
import ReturnFlow from '@components/ReturnFlow'

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
          <ReturnFlow tid={id} />
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
