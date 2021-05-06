import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateUserProfile } from 'db'
import Link from 'next/link'
import { ErrorMessage } from '@hookform/error-message'

import Loading from '@components/Loading'

export default function ReturnForm({ tid = '' }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  console.log('ERRORS', errors)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVarified, setIsVarified] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [response, setResponse] = useState({})

  const onSubmit = async (data) => {
    const { displayName, newTag, phone, tags, email } = data
    setIsSubmitting(true)
    console.log('Edit Profile ', data)
  }

  return (
    <div className="box">
      <div className="form-wrap">
        <form className="form">
          {!response.error && (
            <>
              <h2>Let's add some details</h2>
              <fieldset>
                <label htmlFor="name">Your name:</label>
                <input
                  id="name"
                  defaultValue={''}
                  {...register('name', {
                    required: { value: true, message: 'Name is required!' },
                    minLength: { value: 6, message: 'Name format is incorrect!' },
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
                    minLength: { value: 6, message: 'phone format is incorrect!' },
                  })}
                ></input>
                <span className="inline-error">
                  <ErrorMessage errors={errors} name="phone" />
                </span>
              </fieldset>
              <fieldset>
                <label htmlFor="message">Message:</label>
                <input id="message" defaultValue={''} {...register('message', {})}></input>
              </fieldset>

              <div className="buttons-container">
                <a className="cta">Notify the Owner</a> (NOTE: Won't work now)
              </div>
            </>
          )}
        </form>
      </div>
      {isSuccess && (
        <Loading>
          <h1>Congratulations!</h1>
          <h3>You have successfully activated your new Tag</h3>
          <hr></hr>
          <h2>All your registered Tags</h2>
          <div className="form tag-list"></div>
          <hr></hr>
          <Link href="/">
            <a className="cta">Go to home page</a>
          </Link>
        </Loading>
      )}
    </div>
  )
}
