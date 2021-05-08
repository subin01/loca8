import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'
import TagFlow from '@components/TagFlow'

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
          <h1>Tag: {id}</h1>
          <TagFlow id={id} />
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
