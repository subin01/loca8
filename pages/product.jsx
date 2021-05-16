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
          <article>
            <div>
              <h1>A locket with a secret code </h1>
              <p>
                It is a cute, simple and quick traceable locket that locates your lost asset. Purchasing one Loca8
                locket and attaching to your asset makes it worth and pretty. A unique locket with a QR code is what
                Loca8 is all about. A beautiful accessory with a secret code will be a treasure for you.
              </p>
            </div>
            <div className="image-mask">
              <img src="/images/product1.jpeg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>Wear the Loca8 locket and toss the troubles!</h2>
              <p>
                With the Loca8 locket around your asset, you are almost safe from losing them forever. The asset
                received by somebody with the Loca8 locket attached just need scan and you are one step nearer to your
                lost asset.
              </p>
            </div>
            <div className="image-mask  image-left">
              <img src="/images/keys1.jpeg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>Get it even before you know it’s gone!</h2>
              <p>
                With the simplicity of the process it is super quick to get your asset in your hands. The Loca8 lockets
                are attractive and noticeable. Anyone can easily operate due to its easiness in usage.
              </p>
            </div>
            <div className="image-mask  image-right">
              <img src="/images/dog1.jpeg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>Making things a bit more relaxing</h2>
              <p>
                Joining in your grief about your loss and extending a helping hand is rewarding for both the giver and
                the taker. Through Loca8 you are actually being of part of the grief and a relief in their memories.
              </p>
            </div>
            <div className="image-mask  image-left">
              <img src="/images/bag1.jpeg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>Loca8 respect you & the environment equally</h2>
              <p>
                Your mail ID or any credential is not being saved in our system for your privacy. The whole process is
                keeping your privacy respectful. Loca8 locket is made of stainless steel which is durable, recyclable
                and is extremely resistant to corrosion and you need not worry about the durability of the material and
                its maintenance.
              </p>
            </div>
            <div className="image-mask  image-right">
              <img src="/images/keys1.jpeg" alt="" />
            </div>
          </article>
          <article>
            <div>
              <h2>Loca8 is your cute friend who never takes your beam</h2>
              <p>
                Loca8 is crafted with stainless which has no harmful effects on health; it has no radiation and doesn’t
                emit any unsafe substances that make you sick and take your cheer away. Loca8 stands out and shouts out
                as a superhero
              </p>
              <ul>
                <li>100% sustainable</li>
                <li>Harmless to health</li>
                <li>Flexible to operate</li>
                <li>Simple process</li>
                <li>Faster probability of traceability</li>
                <li>Dual communication modes</li>
                <li>No maintenance</li>
                <li>Best data privacy</li>
                <li>Pocket friendly</li>
                <li>Rust resistant and robust </li>
              </ul>
            </div>
          </article>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
