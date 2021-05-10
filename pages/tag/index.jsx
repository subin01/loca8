import Head from 'next/head'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TagFlow from '../../components/TagFlow'

import { useRouter } from 'next/router'

export default function Return() {
  const router = useRouter()
  const id = router.query.id
  return (
    <>
      <Head>
        <title>Loca8 | Locate the owner | Return or Register a Tag</title>
      </Head>

      <Header></Header>

      <div className="page-tag">
        <main>
          <TagFlow id={id} />
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
