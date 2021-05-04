import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'

import styles from 'styles/Home.module.scss'

export default function Home() {
  return (
    <>
      <Head></Head>

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
