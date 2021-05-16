// @ts-nocheck
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Header from '../components/Header'
import Footer from '../components/Footer'
import TagID from '../components/TagID'
import { iTagID } from '../types'

interface IForm {
  tagId: iTagID
}

// export const config = { amp: true }

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onChange' })
  const Router = useRouter()

  const onSubmit = async (data: IForm) => {
    const { tagId } = data
    console.log('Submit', tagId, errors)
    Router.replace(`/tag/?id=${tagId}`)
  }

  return (
    <>
      <Head>
        <title>Loca8 | Locate the owner | Home</title>
      </Head>

      <Header></Header>

      <div>
        <main className="page-home">
          <section className="hero">
            <h1>Welcome to Loca8!</h1>
            <div className="intro">
              <p>
                Hey, thank for trusting and adding me to your closest friend list. I can stand by you and make your
                search one step forward. A little concern from Loca8 locket may bring a smile on your face.{' '}
              </p>
            </div>
          </section>
          <form className="form tag-field-with-cta" onSubmit={handleSubmit(onSubmit)}>
            <TagID tid={''} register={register} errors={errors} />
            <button className="cta" type="submit">
              Let's Go!
            </button>
          </form>

          <div className="grid">
            <Link href="/faq/">
              <a className="card">
                <h2>Got Questions?</h2>
                <p>Know more about me which will make our journey easier and faster, just like me.</p>
              </a>
            </Link>

            <Link href="/product/">
              <a className="card">
                <h2>More about Product</h2>
                <p>A simple locket comes to save your lost asset at pocket friendly and with smart persona </p>
              </a>
            </Link>
          </div>
        </main>

        <Footer></Footer>
      </div>
    </>
  )
}

// export const getStaticProps = () => {
//   return {
//     props: {
//       buildTimestamp: Date.now(),
//     },
//   }
// }
