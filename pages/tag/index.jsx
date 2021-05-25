import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TagFlow from '../../components/TagFlow'
import { AuthProvider } from '../../contexts/AuthContext'

export default function Return() {
  const router = useRouter()
  const id = router.query.id
  console.log('Query String: TID ', id)
  return (
    <>
      <Head>
        <title>Loca8 | Locate the owner | Return or Register a Tag</title>
      </Head>

      <Header></Header>

      <div className="page-tag">
        <main>
          <AuthProvider>
            <TagFlow id={id} />
          </AuthProvider>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
