import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { verifyTag, constants } from 'db'
import Link from 'next/link'
import { ErrorMessage } from '@hookform/error-message'

import Loading from '@components/Loading'

export default function VerifyTagForm({ tid = '' }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  console.log('ERRORS', errors)
  const [tagNumber, setTagNumber] = useState(tid)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [response, setResponse] = useState({})

  async function checkTag() {
    const tagRes = await verifyTag(tid)
    console.log('checkTag', tagRes)
  }

  function validateTagFormat(tid) {
    return tid.trim() !== '' && tid.length > 5 && tid.length < 10
  }

  // useEffect(() => {
  //   if (validateTagFormat(tid)) {
  //     checkTag()
  //   }
  // }, [tid])

  const onSubmit = async (data) => {
    const { tagid } = data
    setIsSubmitting(true)
    setTagNumber(tagid)

    console.log('tagid', tagid)

    // // Call DB API
    // const tagRes = await verifyTag(tid)
    const tagRes = await verifyTag({ tid: tagid })
    // const tagRes = await updateUserProfile(tid)
    console.log('checkTag', tagRes.data, tagRes.data.error)

    if (tagRes.data.error) {
      setResponse(tagRes.data)
      setIsSubmitting(false)

      if (tagRes.data.errorType === constants.TAG_STATUS_UNREGISTERED) {
        console.log('Unregistered Tag, Do you want to register?')
      }

      if (tagRes.data.errorType === constants.TAG_INVALID) {
        console.log('Invalid Tag, Please double check!')
        setError('tagid', {
          type: 'invalid',
          message: 'Invalid Tag, Please try again',
        })
      }
    } else {
      setTimeout(() => {
        // setIsSuccess(true)
      }, 500)
    }
  }

  return (
    <div className="form-wrap">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="box">
          <h2>Please verify tag details</h2>

          {response?.activation?.error && (
            <div className="message">Sorry, There was some problem! Please check the details and try again!</div>
          )}

          <div className="inline">
            <fieldset>
              <label htmlFor="tagid">Tag ID:</label>
              <input
                id="tagid"
                defaultValue={tid}
                {...register('tagid', {
                  required: { value: true, message: 'Tag ID is required!' },
                  minLength: { value: 6, message: 'Tag ID format is incorrect!' },
                })}
              ></input>
              <span className="inline-error">
                <ErrorMessage errors={errors} name="tagid" />
              </span>
            </fieldset>

            <button type="submit" className="cta" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
          </div>
          {response.error && response.errorType === constants.TAG_STATUS_UNREGISTERED && (
            <div>
              <hr></hr>
              <h3>This is an unregistered Tag, Do you want to register?</h3>
              <p>Note: You would need an Activation Key, to complete the process </p>
              <div className="buttons-container">
                <Link href={`/register/${tagNumber}`}>
                  <a className="cta">Continue to Registration</a>
                </Link>
              </div>
            </div>
          )}
          {!response.error && (
            <div>
              <hr></hr>
              <h2>Awesome! Let's add some details</h2>
              <fieldset>
                <label htmlFor="tagid">Your name:</label>
                <input
                  id="name"
                  defaultValue={''}
                  {...register('name', {
                    required: { value: true, message: 'Tag ID is required!' },
                    minLength: { value: 6, message: 'Tag ID format is incorrect!' },
                  })}
                ></input>
                <span className="inline-error">
                  <ErrorMessage errors={errors} name="name" />
                </span>
              </fieldset>
              <fieldset>
                <label htmlFor="tagid">Phone:</label>
                <input
                  id="phone"
                  defaultValue={''}
                  {...register('phone', {
                    required: { value: true, message: 'Tag ID is required!' },
                    minLength: { value: 6, message: 'Tag ID format is incorrect!' },
                  })}
                ></input>
                <span className="inline-error">
                  <ErrorMessage errors={errors} name="phone" />
                </span>
              </fieldset>
              <fieldset>
                <label htmlFor="tagid">Message:</label>
                <input
                  id="message"
                  defaultValue={''}
                  {...register('message', {
                    required: { value: true, message: 'Tag ID is required!' },
                    minLength: { value: 6, message: 'Tag ID format is incorrect!' },
                  })}
                ></input>
                <span className="inline-error">
                  <ErrorMessage errors={errors} name="message" />
                </span>
              </fieldset>

              <div className="buttons-container">
                <a className="cta">Notify the Owner</a> (NOTE: Won't work now)
              </div>
            </div>
          )}
        </div>
      </form>

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
