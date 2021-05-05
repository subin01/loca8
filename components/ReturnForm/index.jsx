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

    // // Call DB API
    // const profileRes = await updateUserProfile({ email, displayName, newTag, phone, tags })
    // console.log('Edit Profile submit', profileRes.data, profileRes.data.error)

    // if (profileRes.data.error || profileRes.data.activation.error) {
    //   setResponse(profileRes.data)
    //   setIsSubmitting(false)

    //   if (profileRes.data.activation.errorField === 'key') {
    //     setError('newTag.key', {
    //       type: 'invalid',
    //       message: profileRes.data.activation.message,
    //     })
    //   }

    //   if (profileRes.data.activation.errorField === 'tid') {
    //     setError('newTag.tid', {
    //       type: 'invalid',
    //       message: profileRes.data.activation.message,
    //     })
    //   }
    // } else {
    //   setTimeout(() => {
    //     setIsSuccess(true)
    //   }, 500)
    // }
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
          </div>
        </div>

        {isVarified && (
          <div className="box">
            <h2>Your Details</h2>
            <p>Please add some details for the owner to contact you.</p>
            <fieldset>
              <label htmlFor="phone">
                Mobile <span>(without country code, 10 digits)</span>
              </label>
              <input
                id="phone"
                type="tel"
                defaultValue=""
                {...register('phone', {
                  required: { value: true, message: 'Mobile number is required!' },
                  pattern: { value: /^[789]\d{9}$/, message: 'Mobile number format is incorrect!' },
                })}
              ></input>
              <span className="inline-error">
                <ErrorMessage errors={errors} name="phone" />
              </span>
            </fieldset>
            {/* <fieldset>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" defaultValue={user?.email}></input>
        </fieldset> */}
            <fieldset>
              <label htmlFor="displayName">Your name</label>
              <input
                id="displayName"
                defaultValue=""
                {...register('displayName', {
                  required: { value: true, message: 'Name is required!' },
                  minLength: { value: 3, message: 'Name is required, min 3 characters!' },
                  maxLength: { value: 20, message: 'Name is required to be under 20 characters!' },
                })}
              ></input>
              <span className="inline-error">
                <ErrorMessage errors={errors} name="displayName" />
              </span>
            </fieldset>

            <fieldset className="note">
              <label htmlFor="newTag.notes">
                Notes: <span>(Example: My apartment keys)</span>
              </label>
              <input id="newTag.notes" {...register('newTag.notes', { required: true, minLength: 3 })}></input>
              <span className="inline-error">
                {errors?.newTag?.notes?.type === 'required' && 'Notes is required!'}
                {errors?.newTag?.notes?.type === 'minLength' && 'Notes is required!'}
              </span>
            </fieldset>
          </div>
        )}

        <button type="submit" className="cta" disabled={isSubmitting}>
          {isSubmitting ? 'Saving Details...' : 'Notify the Owner'}
        </button>
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
