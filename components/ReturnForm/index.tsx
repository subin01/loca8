// @ts-nocheck
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { ErrorMessage } from '@hookform/error-message'
import LoadingInline from '@components/LoadingInline'

import { notifyOwner, verifyTag } from 'db'
import { iTagID, iReturnForm } from 'types'
import { TAG_INVALID, TAG_STATUS_UNREGISTERED } from 'global_constants'
import Loading from '@components/Loading'

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
  const [notifyRes, setNotifyRes] = useState({})

  const onSubmit = async (data: iReturnForm) => {
    console.log('Edit Profile ', tid, data)
    const { name, phone, email, message } = data
    setNotifyRes({}) // clear previous res
    setIsSubmitting(true)

    // Call DB API
    const serverRes = await notifyOwner({ tid, name, phone, email, message })

    // const serverRes = await verifyTag({ tid })

    console.log('serverRes ', serverRes)

    setNotifyRes(serverRes?.data || {})
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
    <div className="box loadingContainer">
      <div className="form-wrap">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Please add your details</h2>
          <fieldset>
            <label htmlFor="name">Your name:</label>
            <input
              id="name"
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
          </fieldset>

          <div className="buttons-container">
            <button type="submit" className="cta">
              {isSubmitting ? 'Sending...' : 'Notify the Owner'}
            </button>
          </div>
        </form>
        {isSubmitting && <LoadingInline>Hold on! Notifying the Owner...</LoadingInline>}
        {notifyRes.error === false && (
          <LoadingInline showLoader={false}>
            <h1>All Done!</h1>
            <hr></hr>
            <h3>We've notified the owner</h3>
            <p>
              Thank your your honesty, we've shared your contact information. Please keep a check on your phone for a
              call or message
            </p>
            <hr></hr>
            <h3>Are you interested in getting Loca8 Tag for yourself?</h3>
            <Link href="/about">
              <a className="cta">Yes, Show me options</a>
            </Link>
            <br></br>
            <br></br>
            <Link href="/">
              <a>No, am good!</a>
            </Link>
          </LoadingInline>
        )}
      </div>
    </div>
  )
}
