import Head from 'next/head'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Account from '../../components/Account'
import Banner from '../../components/Banner'
import { AuthProvider } from '../../contexts/AuthContext'

function AccountPage() {
  return (
    <>
      <Head>
        <title>Loca8 | Your Account</title>
      </Head>
      <Header></Header>
      <Banner size="tiny">
        <h1>Your Account</h1>
      </Banner>
      <main className="page-account">
        <AuthProvider>
          <Account />
        </AuthProvider>
      </main>
      <Footer></Footer>
    </>
  )
}

export default AccountPage
