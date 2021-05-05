import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { updateUserProfile, verifyTag, constants } from 'db'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVarified, setIsVarified] = useState(false)
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
    const { displayName, newTag, phone, tags, email } = data
    setIsSubmitting(true)

    // // Call DB API
    const tagRes = await verifyTag(tid)
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
      }
    } else {
      setTimeout(() => {
        setIsSuccess(true)
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
              <label htmlFor="newTag.tid">Tag ID:</label>
              <input
                id="newTag.tid"
                defaultValue={tid}
                {...register('newTag.tid', {
                  required: { value: true, message: 'Tag ID is required!' },
                  minLength: { value: 6, message: 'Tag ID format is incorrect!' },
                })}
              ></input>
              <span className="inline-error">
                <ErrorMessage errors={errors} name="newTag.tid" />
              </span>
            </fieldset>

            <button type="submit" className="cta" disabled={isSubmitting}>
              {isSubmitting ? 'Saving Details...' : 'Varify'}
            </button>
          </div>
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
