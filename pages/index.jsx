import Head from 'next/head'
import Link from 'next/link'

import Header from '@components/Header'
import Footer from '@components/Footer'

import styles from 'styles/Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Loca8 | Locate the owner | Home</title>
      </Head>

      <Header></Header>

      <div className={styles.container}>
        <main>
          <h1 className={styles.title}>Welcome!</h1>
          <h3>
            <Link href="http://localhost:3000/x/12345678">
              <a>Test</a>
            </Link>
          </h3>
          <div className={styles.grid}>
            <Link href="/register/1234567">
              <a className={styles.card}>
                <h2>Register a new Tag &rarr;</h2>
                <p>Find in-depth information about features and API.</p>
              </a>
            </Link>

            <Link href="/return/1234567">
              <a className={styles.card}>
                <h2>Return a tag &rarr;</h2>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>
            </Link>

            <Link href="/faq">
              <a className={styles.card}>
                <h2>FAQ &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
            </Link>

            <Link href="/about">
              <a className={styles.card}>
                <h2>About &rarr;</h2>
                <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
              </a>
            </Link>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
