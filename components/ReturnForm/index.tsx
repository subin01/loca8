// @ts-nocheck
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Link from 'next/link'
import { ErrorMessage } from '@hookform/error-message'

import LoadingInline from '../LoadingInline'
import Banner from '../../components/Banner'
import TagID from '../TagID'
import Phone from '../Phone'
import { notifyOwner, analytics } from '../../db'
import { iTagID, iReturnForm } from '../../types'

interface IProps {
  tid: iTagID
  updateStep(step: number): void
}

export default function ReturnForm({ tid }: IProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<iReturnForm>({ mode: 'onBlur' })

  console.log('ERRORS', errors)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notifyRes, setNotifyRes] = useState(null)

  const onSubmit = async (data: iReturnForm) => {
    const { name, phone, email, message } = data

    setNotifyRes(null) // clear previous res
    setIsSubmitting(true)
    analytics().logEvent('return_form_submitted')
    // Call DB API
    const serverRes = await notifyOwner({ tid, name, phone, email, message })

    setNotifyRes(serverRes?.data || null)
    console.log('ReturnForm ', serverRes)

    setIsSubmitting(false)
  }

  return (
    <div className="loadingContainer">
      {notifyRes === null && (
        <>
          <Banner>
            <h4>
              Return Tag
              <TagID tid={tid} readOnly control={control} errors={errors} />
            </h4>
            <h1>You found a tag!</h1>
            <p className="marginBottom2">Let's return it to the rightful owner, Please add your details</p>
          </Banner>

          <main className="slide-return-form">
            <div className="form-wrap loadingContainer">
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
                      maxLength: { value: 15, message: 'Maximum 15 characters!' },
                    })}
                  ></input>
                  <span className="inline-error">
                    <ErrorMessage errors={errors} name="name" />
                  </span>
                </fieldset>

                <Phone control={control} errors={errors} />

                <fieldset>
                  <label htmlFor="email">
                    Email: <span>(Optional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    defaultValue={''}
                    {...register('email', {
                      minLength: { value: 5, message: 'Email format is incorrect!' },
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'Email format is incorrect!',
                      },
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
                  <textarea
                    id="message"
                    defaultValue={''}
                    {...register('message', {
                      maxLength: { value: 200, message: 'Keep the message under 200 characters!' },
                    })}
                  ></textarea>
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
          </main>
        </>
      )}

      {notifyRes !== null && notifyRes?.error === false && (
        <>
          <Banner>
            <h1>All Done!</h1>
            <h2>We appreciate your your honesty!</h2>
            <p>
              Your contact information is shared with the owner. Please keep a check on your phone for a call or
              message.
            </p>
          </Banner>

          <main>
            <h2>Hey! Do you want a Loca8 Tag for yourself?</h2>
            <p>You could be the one receiving such a notification next time, you never know!</p>
            <div className="inline-buttons">
              <Link href="/">
                <a>No, am good!</a>
              </Link>
              <Link href="/product/">
                <a className="cta">Yes, Tell me about it</a>
              </Link>
            </div>
          </main>
        </>
      )}

      {notifyRes !== null && notifyRes?.error === true && (
        <>
          <Banner>
            <h1>Oh no!</h1>
            <h2>There was some issue with request!</h2>
            <p>
              <a href="javascript:location.reload();">Please try again!</a>
            </p>
          </Banner>
        </>
      )}

      {isSubmitting && <LoadingInline>Hold on! Notifying the Owner...</LoadingInline>}
    </div>
  )
}
