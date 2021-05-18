// @ts-nocheck
import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { generateTags } from '../../db'

import TagID from '../components/TagID'
import { iTagID } from '../types'

interface IForm {
  tagId: iTagID
}

// export const config = { amp: true }

export default function Admin() {
  const [series, setSeries] = useState(8888)
  const [start, setStart] = useState(1000)
  const [count, setCount] = useState(4)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onChange' })

  const Router = useRouter()

  const onSubmit = async (data: IForm) => {
    console.log('Edit Profile ', data)

    const tagsRes = await generateTags({ series: data.series, start: data.start, count: data.count })
    console.log('tagsRes submit', tagsRes.data)
  }

  return (
    <>
      <Head>
        <title>Loca8 | Locate the owner | Home</title>
      </Head>

      <section className="hero">
        <h1>Admin</h1>
        <div className="intro"></div>
      </section>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="key">Series</label>
          <input id="series" maxLength="4" type="number" defaultValue={series} {...register('series', {})}></input>
        </fieldset>

        <fieldset>
          <label htmlFor="key">Sequence start</label>
          <input id="start" maxLength="4" type="number" defaultValue={start} {...register('start', {})}></input>
        </fieldset>

        <fieldset>
          <label htmlFor="key">No of tags</label>
          <input id="count" maxLength="4" type="number" defaultValue={count} {...register('count', {})}></input>
        </fieldset>

        <fieldset>
          <label htmlFor="type">Type</label>
          <input id="type" maxLength="4" defaultValue={'initial'} {...register('type', {})}></input>
        </fieldset>

        <button className="cta" type="submit">
          Generate
        </button>
      </form>
    </>
  )
}
