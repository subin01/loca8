// @ts-nocheck
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { ErrorMessage } from '@hookform/error-message'
import LoadingInline from '@components/LoadingInline'

import { notifyOwner } from 'db'
import { iTagID, iReturnForm } from 'types'

interface IProps {
  tid: iTagID
  updateStep(step: number): void
}

export default function ReturnForm({ tid }: IProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<iReturnForm>({ mode: 'onChange' })

  console.log('ERRORS', errors)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notifyRes, setNotifyRes] = useState(null)

  const onSubmit = async (data: iReturnForm) => {
    console.log('Edit Profile ', tid, data)
    const { name, phone, email, message } = data
    setNotifyRes(null) // clear previous res
    setIsSubmitting(true)

    // Call DB API
    const serverRes = await notifyOwner({ tid, name, phone, email, message })

    // const serverRes = await verifyTag({ tid })

    console.log('serverRes ', serverRes)

    setNotifyRes(serverRes?.data || null)
    setIsSubmitting(false)

    // if (serverRes?.data?.error && serverRes?.data?.errorType === TAG_INVALID) {
    //   console.log('InvalidTAG')
    //   setError('tagId', {
    //     type: 'invalid',
    //     message: 'Invalid Tag ID, Please check the Tag ID!',
    //   })
    // } else if (serverRes.data.error === false) {
    //   updateStep(2)
    // }
  }

  return (
    <div className="loadingContainer">
      {notifyRes === null && (
        <section className="slide-return-form">
          <h1>You found a tag!</h1>
          <h2>Let's return it to the rightful owner, Please add your details</h2>
          <div className="form-wrap">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <label htmlFor="name">Your name:</label>
                <input
                  id="name"
                  className="field-name"
                  defaultValue={''}
                  {...register('name', {
                    required: { value: true, message: 'Name is required!' },
                    minLength: { value: 3, message: 'Name format is incorrect!' },
                  })}
                ></input>
                <span className="inline-error">
                  <ErrorMessage errors={errors} name="name" />
                </span>
              </fieldset>

              <fieldset>
                <label htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  className="field-phone"
                  defaultValue={''}
                  {...register('phone', {
                    required: { value: true, message: 'phone is required!' },
                    minLength: { value: 3, message: 'phone format is incorrect!' },
                  })}
                ></input>
                <span className="inline-error">
                  <ErrorMessage errors={errors} name="phone" />
                </span>
              </fieldset>

              <fieldset>
                <label htmlFor="email">
                  Email: <span>(Optional)</span>
                </label>
                <input
                  id="email"
                  defaultValue={''}
                  {...register('email', {
                    minLength: { value: 3, message: 'email format is incorrect!' },
                  })}
                ></input>
                <span className="inline-error">
                  <ErrorMessage errors={errors} name="email" />
                </span>
              </fieldset>

              <fieldset>
                <label htmlFor="message">
                  Message: <span>(Optional)</span>
                </label>
                <textarea id="message" defaultValue={''} {...register('message', {})}></textarea>
                <span className="inline-error">
                  <ErrorMessage errors={errors} name="message" />
                </span>
              </fieldset>

              <div className="inline-buttons">
                <button type="submit" className="cta" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Notify Owner'}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {notifyRes !== null && notifyRes?.error === false && (
        <section className="slide-notify-success">
          <div>
            <h1>All Done!</h1>
            <h2>We appreciate your your honesty!</h2>
            <p>
              Your contact information is shared with the owner. Please keep a check on your phone for a call or
              message.
            </p>
          </div>

          <div className="slide-sell">
            <h2>Hey! Do you want a Loca8 Tag for yourself?</h2>
            <p>You could be the one receiving such a notification next time, you never know!</p>
            <div className="inline-buttons">
              <Link href="/">
                <a>No, am good!</a>
              </Link>
              <Link href="/product">
                <a className="cta">Yes, Show me options</a>
              </Link>
            </div>
          </div>
        </section>
      )}

      {isSubmitting && <LoadingInline>Hold on! Notifying the Owner...</LoadingInline>}
    </div>
  )
}
