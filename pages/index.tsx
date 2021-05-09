// @ts-nocheck
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Header from '@components/Header'
import Footer from '@components/Footer'
import TagID from '@components/TagID'
import { iTagID } from 'types'

interface IForm {
  tagId: iTagID
}

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
    Router.replace(`/tag/${tagId}`)
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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun.</p>
            </div>
          </section>
          <form className="form tag-field-with-cta" onSubmit={handleSubmit(onSubmit)}>
            <TagID tid={''} register={register} errors={errors} />
            <button className="cta" type="submit">
              Let's Go!
            </button>
          </form>

          <div className="grid">
            <Link href="/faq">
              <a className="card">
                <h2>FAQ &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
            </Link>

            <Link href="/product">
              <a className="card">
                <h2>About the Product &rarr;</h2>
                <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
              </a>
            </Link>
          </div>
        </main>

        <Footer></Footer>
      </div>
    </>
  )
}
