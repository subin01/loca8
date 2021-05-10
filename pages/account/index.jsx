import Head from 'next/head'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Account from '../../components/Account'

function AccountPage() {
  return (
    <>
      <Head>
        <title>Loca8 | Locate the owner | Your Account</title>
      </Head>
      <Header></Header>
      <main>
        <Account />
      </main>
      <Footer></Footer>
    </>
  )
}

export default AccountPage
