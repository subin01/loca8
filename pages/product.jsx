import Head from 'next/head'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head></Head>

      <Header></Header>

      <div>
        <main className="page-product">
          <h1>Product</h1>
          <p>
            Lorem ipsum dolor sit amet, consectet ipsum dolor sit amet, consectetipsum dolor sit amet, consectetipsum
            dolor sit amet, consectet ipsum dolor sit amet, consectet
          </p>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
