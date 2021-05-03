import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateUserProfile } from 'db'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ErrorMessage } from '@hookform/error-message'

import Loading from '@components/Loading'

export default function RegisterForm({ tid = '', user }) {
  const Router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  console.log('ERRORS', errors)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [response, setResponse] = useState({})

  const onSubmit = async (data) => {
    const { displayName, newTag, phone, tags } = data
    setIsSubmitting(true)
    console.log('Edit Profile ', data)
    const email = user?.email || ''

    // Call DB API
    const profileRes = await updateUserProfile({ email, displayName, newTag, phone, tags })
    console.log('Edit Profile submit', profileRes.data, profileRes.data.error)

    if (profileRes.data.error || profileRes.data.activation.error) {
      setResponse(profileRes.data)
      setIsSubmitting(false)

      if (profileRes.data.activation.error) {
        setError('newTag.code', {
          type: 'invalid',
          message: 'Invalid Activation Code!',
        })
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
          <h2>Step 2: Your details</h2>
          <p>So we can contact you in case of a lost & found situation. This will NOT leave our system!</p>
          <fieldset>
            <label htmlFor="phone">
              Mobile <span>(without country code, 10 digits)</span>
            </label>
            <input
              id="phone"
              type="tel"
              defaultValue={user?.phone}
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
              defaultValue={user?.displayName}
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
          <br></br>
          <div style={{ display: 'none' }}>
            {user?.tags?.length > 0 && <h2>Your existing Tags</h2>}
            {user?.tags?.map((tag, i) => {
              const fieldName = `tags[${i}]`
              return (
                <div className="inline" key={tag.tid}>
                  <fieldset>
                    <span className="tagId">{tag.tid}</span>
                  </fieldset>
                  <fieldset className="note">
                    <input
                      type="hidden"
                      defaultValue={tag.tid}
                      {...register(`${fieldName}.tid`, { required: true })}
                    ></input>
                    <input
                      id="notes"
                      defaultValue={tag.notes}
                      {...register(`${fieldName}.notes`, {
                        required: { value: true, message: 'Note is required!' },
                        minLength: { value: 3, message: 'Note is required!' },
                      })}
                    ></input>
                    <span className="inline-error">
                      <ErrorMessage errors={errors} name={`${fieldName}.notes`} />
                    </span>
                  </fieldset>
                </div>
              )
            })}
          </div>
        </div>
        <div className="box">
          <h2>Step 3: New Tag details</h2>
          <p>So we can contact you in case of a lost & found situation. This will NOT leave our system!</p>

          {response?.activation?.error && <div className="message">{response.activation.message}</div>}

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
            <fieldset>
              <label htmlFor="code">Activation Code:</label>
              <input
                id="code"
                {...register('newTag.code', {
                  required: { value: true, message: 'Activation code is required' },
                  minLength: { value: 4, message: 'Activation code format is incorrect!' },
                })}
              ></input>
              <span className="inline-error">
                <ErrorMessage errors={errors} name="newTag.code" />
              </span>
            </fieldset>
          </div>
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

        <button type="submit" className="cta" disabled={isSubmitting}>
          {isSubmitting ? 'Saving Details...' : 'Save Details'}
        </button>
      </form>

      {isSuccess && (
        <Loading>
          <h1>Congratulations!</h1>
          <h3>You have successfully activated your new Tag</h3>
          <hr></hr>
          <h2>All your registered Tags</h2>
          <div className="form">
            {user?.tags?.map((tag, i) => {
              const fieldName = `tags[${i}]`
              return (
                <div className="inline" key={tag.tid}>
                  <fieldset>
                    <span className="tagId">{tag.tid}</span>
                  </fieldset>
                  <fieldset className="note">
                    <input
                      type="hidden"
                      defaultValue={tag.tid}
                      {...register(`${fieldName}.tid`, { required: true })}
                    ></input>
                    <input
                      id="notes"
                      disabled
                      defaultValue={tag.notes}
                      {...register(`${fieldName}.notes`, {
                        required: { value: true, message: 'Note is required!' },
                        minLength: { value: 3, message: 'Note is required!' },
                      })}
                    ></input>
                    <span className="inline-error">
                      <ErrorMessage errors={errors} name={`${fieldName}.notes`} />
                    </span>
                  </fieldset>
                </div>
              )
            })}
            <hr></hr>
            <Link href="/">
              <a className="cta">Go to home page</a>
            </Link>
          </div>
        </Loading>
      )}
    </div>
  )
}
