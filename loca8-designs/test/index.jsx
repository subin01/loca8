import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TestTagForm from '../../components/TestTagForm'

export default function Tag() {
  const router = useRouter()
  const id = router.query.id
  console.log('Query String: TID ', id)
  return (
    <>
      <Head>
        <title>Loca8 | Return or Register a Tag</title>
      </Head>

      <Header></Header>

      <div className="page-tag">
        <main>
          <h1>TEST</h1>
          <TestTagForm />
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
