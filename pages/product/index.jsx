import Head from 'next/head'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Banner from '../../components/Banner'

export default function Product() {
  return (
    <>
      <Head>
        <title>Loca8 | Product details </title>
      </Head>

      <Header></Header>
      <Banner>
        <h1>Much more than a locket</h1>
        <p>It's a safety accessory to attach to your assets.</p>
        <br />
      </Banner>

      <div>
        <main className="page-product">
          <div className="grid">
            <article className="image-left">
              <div className="text">
                <h2>Tie the tag & toss the troubles!</h2>
                <p>
                  Anyone can notify you just by scanning the QR code. Now you are one step close to finding your
                  misplaced belongings.
                </p>
              </div>
              <div className="image-mask" style={{ backgroundImage: "url('/images/products/product1.jpg')" }}></div>
            </article>

            <article className="image-right">
              <div className="text">
                <h2>Pet friendly, yes!</h2>
                <p>
                  No electronics, No radio signals — it's harmless to health. Plus, the lockets are attractive! Check
                  out our bowy here <span style={{ whiteSpace: 'nowrap' }}>・ᴥ・</span>
                </p>
              </div>
              <div className="image-mask" style={{ backgroundImage: "url('/images/products/product2.jpg')" }}></div>
            </article>

            <article className="image-left">
              <div className="text">
                <h2>We know to keep it silent</h2>
                <p>Your personal data is safe and strictly confidential. We do not share your data.</p>
              </div>
              <div className="image-mask" style={{ backgroundImage: "url('/images/products/product3.jpg')" }}></div>
            </article>

            <article className="block">
              <div className="text">
                <h2>We love the world we live in!</h2>
                <p>Stainless steel is anti rust, durable, and recyclable. You need not worry about the maintenance.</p>
              </div>
              <div className="image-mask" style={{ backgroundImage: "url('/images/products/product4.jpg')" }}></div>
            </article>

            <article className="grid-item no-image">
              <div className="text">
                <h2>Making things a bit more peaceful</h2>
                <p>
                  Extending a helping hand while locating your belonging and handing over is rewarding for both the
                  giver and the taker.
                </p>
              </div>
            </article>

            <article className="grid-item no-image">
              <div className="text">
                <h2>Stands out & shouts out as a superhero!</h2>
                <ul>
                  <li>Sustainable</li>
                  <li>Maintenance free</li>
                  <li>Durable & Rust resistant</li>
                  <li>Harmless to health</li>
                  <li>Easy to use</li>
                  <li>SMS & Email notifications</li>
                  <li>Confidentiality</li>
                  <li>Pocket friendly</li>
                </ul>
              </div>
            </article>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
