import Head from 'next/head'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Account from '../../components/Account'
import { AuthProvider } from '../../contexts/AuthContext'

function AccountPage() {
  return (
    <>
      <Head>
        <title>Loca8 | Your Account</title>
      </Head>
      <Header></Header>
      <main>
        <AuthProvider>
          <Account />
        </AuthProvider>
      </main>
      <Footer></Footer>
    </>
  )
}

export default AccountPage
