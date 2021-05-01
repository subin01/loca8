import Head from 'next/head'

import Header from 'components/Header'
import Footer from 'components/Footer'

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
          <h1 className={styles.title}>Welcome!</h1>

          <div className={styles.grid}>
            <a href="/register/0" className={styles.card}>
              <h2>Register a new Tag &rarr;</h2>
              <p>Find in-depth information about features and API.</p>
            </a>

            <a href="/return/0" className={styles.card}>
              <h2>Return a tag &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a href="/faq/" className={styles.card}>
              <h2>FAQ &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a href="/about/" className={styles.card}>
              <h2>About &rarr;</h2>
              <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
            </a>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
