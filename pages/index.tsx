// @ts-nocheck
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Header from '@components/Header'
import Footer from '@components/Footer'
import TagID from '@components/TagID'
import styles from 'styles/Home.module.scss'
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

      <div className={styles.container}>
        <main>
          <h1 className={styles.title}>Welcome to Loca8!</h1>
          <hr></hr>

          <div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="inline">
                <TagID tid={''} register={register} errors={errors} />
                &nbsp;
                <button className="cta" type="submit">
                  Go!
                </button>
              </div>
            </form>
          </div>
          <hr></hr>

          <div className={styles.grid}>
            <Link href="/faq">
              <a className={styles.card}>
                <h2>FAQ &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
            </Link>

            <Link href="/about">
              <a className={styles.card}>
                <h2>About &rarr;</h2>
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
