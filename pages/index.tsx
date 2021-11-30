// @ts-nocheck
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import TagID from '../components/TagID'
import { iTagID } from '../types'

interface IForm {
  tagId: iTagID
}

// export const config = { amp: true }

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onBlur' })
  const Router = useRouter()

  const onSubmit = async (data: IForm) => {
    const { tagId } = data
    console.log('Submit', tagId, errors)
    Router.replace(`/tag/?id=${tagId}`)
  }

  return (
    <>
      <Head>
        <title>Loca8 | Locate the owner | Home Page</title>
      </Head>

      <Header variant="light"></Header>
      <Banner id="1" size="large" variant="light">
        <h1>
          Locket with <br />a secret code!
        </h1>
        <p>A simple traceable locket with a QR&nbsp;code that helps to locate your misplaced asset.</p>
        <br />
        <Link href="/product/">
          <a className="cta">Tell me more</a>
        </Link>
      </Banner>

      <div>
        <main className="page-home">
          {/* <section className="hero1">
            <h3>Welcome to Loca8!</h3>
            <h1>What's to loose?</h1>
            <div className="intro">
              <p>
                Hey, thank you for trusting and adding me to your closest friend list. Together we can make your search
                one step forward.
              </p>
            </div>
          </section> */}

          <div className="grid">
            <div className="grid-item card card-tagId">
              <h2 className="hl">Got a Loca8 locket?</h2>
              <p>Are you here to register or return a locket?</p>
              <form className="form tag-field-with-cta" onSubmit={handleSubmit(onSubmit)}>
                <TagID tid={''} control={control} errors={errors} />
                <button className="cta" type="submit">
                  Next
                </button>
              </form>
            </div>

            <div className="grid-item card card-faq">
              <h2>Got Questions?</h2>
              <p>Know more about me which will make our journey easier and better.</p>
              <div className="actions">
                <Link href="/faq/">
                  <a className="cta">Support</a>
                </Link>
              </div>
            </div>

            {/* <div className="grid-item card card-product">
              <h2>About the Product</h2>
              <p>A simple locket comes to save your lost asset, pocket friendly and with a smart persona. </p>

              <div className="actions">
                <Link href="/product/">
                  <a className="cta">Product Details</a>
                </Link>
              </div>
            </div> */}
          </div>
        </main>

        <Footer></Footer>
      </div>
    </>
  )
}
