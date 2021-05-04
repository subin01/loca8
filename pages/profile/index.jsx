import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'
import withAuth from 'HOC/withAuth'

function Profile() {
  return (
    <>
      <Head></Head>
      <Header></Header>
      <main>
        <h1>Profile Page</h1>
      </main>
      <Footer></Footer>
    </>
  )
}

export default withAuth(Profile)
