import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Banner from '../../components/Banner'
import TagFlow from '../../components/TagFlow'
import { AuthProvider } from '../../contexts/AuthContext'

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
        <AuthProvider>
          <TagFlow id={id} />
        </AuthProvider>
        <Footer></Footer>
      </div>
    </>
  )
}
