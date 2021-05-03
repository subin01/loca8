import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'

import styles from 'styles/Home.module.scss'

export default function Home() {
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
          <h1 className={styles.title}>FAQ</h1>
          <p>
            Lorem ipsum dolor sit amet, consectet ipsum dolor sit amet, consectetipsum dolor sit amet, consectetipsum
            dolor sit amet, consectet ipsum dolor sit amet, consectet
          </p>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
