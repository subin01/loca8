import Head from 'next/head'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Product() {
  return (
    <>
      <Head>
        <title>Loca8 | Product details </title>
      </Head>

      <Header></Header>

      <div>
        <main className="page-product">
          <article>
            <div>
              <h1>A locket with a secret code </h1>
              <p>
                It is a simple and quick traceable locket with a QR code that helps to locate your misplaced asset.
                Purchase this safety accessory and attach it to your assets!
              </p>
            </div>
            <div className="image-mask">
              <img src="/images/product2.jpg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>Wear the locket and toss the troubles!</h2>
              <p>
                Your misplaced belongings received by anyone with this locket can notify you by scanning the QR code.
                Now you are one step nearer to your lost asset.
              </p>
            </div>
            <div className="image-mask  image-left">
              <img src="/images/product1.jpg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>Get it even before you know it’s gone!</h2>
              <p>
                Quick access to your misplaced asset is assured as the process is simple and easy. The lockets are
                attractive
              </p>
            </div>
            <div className="image-mask  image-right">
              <img src="/images/dog1.jpg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>Making things a bit more peaceful</h2>
              <p>
                Extending a helping hand while locating your belonging and handing over is rewarding for both the giver
                and the taker.
              </p>
            </div>
            <div className="image-mask  image-left">
              <img src="/images/dog9.jpg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>We know to keep it silent</h2>
              <p>
                Your personal data is being used only for the process’s success and it is strictly confidential. We do
                not share or spread your data.
              </p>
            </div>
            <div className="image-mask  image-right">
              <img src="/images/keys1.jpg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>We love the environment we live in!</h2>
              <p>
                Stainless steel made accessory is anti rust, durable, and recyclable. You need not worry about the
                maintenance. It has no harmful radiation and doesn’t emit any unsafe substances that make you sick.
              </p>
            </div>
          </article>

          <article>
            <div>
              <h2>Loca8 stands out and shouts out as a superhero</h2>
              <ul>
                <li>Sustainable</li>
                <li>Harmless to health</li>
                <li>Easy to operate</li>
                <li>Quick traceability</li>
                <li>Maintenance free</li>
                <li>Dual communication modes</li>
                <li>Confidentiality</li>
                <li>Pocket friendly</li>
                <li>Rust resistant and robust</li>
              </ul>
            </div>
          </article>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
