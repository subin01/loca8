import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import { updateUserProfile } from '../../db'
import Link from 'next/link'
import TagID from '../TagID'
import LoadingInline from '../LoadingInline'

export default function RegisterForm({ tid = '', user }) {
  const [subStep, setSubStep] = useState('3A')

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  console.log('ERRORS', errors)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saveRes, setSaveRes] = useState(null)

  const handleNext = async () => {
    const result = await trigger(['displayName', 'phone'])
    console.log('result:', result)
    if (!(errors?.displayName || errors?.phone)) {
      setSubStep('3B')
    }
  }

  const onSubmit = async (data) => {
    const { displayName, newTag, phone, tags } = data
    setIsSubmitting(true)
    setSaveRes(null)
    clearErrors('tagId')
    console.log('Edit Profile ', data)
    const email = user?.email || ''

    // Call DB API
    const profileRes = await updateUserProfile({ email, displayName, newTag, phone, tags })
    console.log('Edit Profile submit', profileRes.data, profileRes.data.error)
    setSaveRes(profileRes.data || null)
    setIsSubmitting(false)

    if (profileRes.data?.error || profileRes.data?.activation?.error) {
      if (profileRes.data?.activation?.errorField === 'tid') {
        setError('tagId', {
          type: 'invalid',
          message: profileRes.data.activation.message,
        })
      }

      if (profileRes.data?.activation?.errorField === 'key') {
        setError('newTag.key', {
          type: 'invalid',
          message: profileRes.data.activation.message,
          shouldFocus: true,
        })
      }

      if (profileRes.data?.activation?.errorField === 'notes') {
        setError('newTag.notes', {
          type: 'invalid',
          message: profileRes.data.activation.message,
          shouldFocus: true,
        })
      }
    } else {
      setSubStep('3C')
    }
  }

  return (
    <section className="slide-register">
      <div className="form-wrap">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {subStep === '3A' && (
            <>
              <h4>
                Register Tag
                <TagID tid={tid} readOnly register={register} errors={errors} />
              </h4>
              <h1>Make sure your details are correct</h1>
              <p className="marginBottom2">
                So we can contact you in case of a lost & found situation. <br></br>Don't worry, it will NOT leave our
                system!
              </p>
              <fieldset>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  className="field-phone"
                  type="tel"
                  defaultValue={user?.phone}
                  {...register('phone', {
                    required: { value: true, message: 'Phone number is required!' },
                    pattern: { value: /^[789]\d{9}$/, message: 'Phone number format is incorrect!' },
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
                  className="field-name"
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
              <div className="inline-buttons">
                <button className="cta" onClick={handleNext}>
                  Next
                </button>
              </div>
            </>
          )}

          {subStep === '3B' && (
            <div className="loadingContainer">
              <h4>
                Register Tag
                <TagID tid={tid} readOnly register={register} errors={errors} />
              </h4>
              <h1>New Tag details</h1>
              <p>You need an Activation key to register this Tag to your account.</p>
              <div>
                {/* <TagID tid={tid} readOnly register={register} errors={errors} /> */}
                <input type="hidden" defaultValue={tid} {...register('newTag.tid', {})} />
                <fieldset>
                  <label htmlFor="key">Activation Key:</label>
                  <input
                    id="key"
                    maxLength="6"
                    type="number"
                    className="field-key"
                    {...register('newTag.key', {
                      required: { value: true, message: 'Activation key is required' },
                      minLength: { value: 4, message: 'Activation key format is incorrect!' },
                      maxLength: { value: 6, message: 'Activation key format is incorrect!' },
                    })}
                  ></input>
                  <span className="inline-error">
                    <ErrorMessage errors={errors} name="newTag.key" />
                  </span>
                </fieldset>
                <fieldset className="note">
                  <label htmlFor="newTag.notes">
                    Notes: <span>&nbsp;(Example: Apartment keyset 1)</span>
                  </label>
                  <input
                    id="newTag.notes"
                    {...register('newTag.notes', {
                      required: { value: true, message: 'Notes is required!' },
                      minLength: { value: 3, message: 'Notes is too short!' },
                      maxLength: { value: 40, message: 'Keep the notes under 40 characters!' },
                    })}
                  ></input>
                  <span className="inline-error">
                    <ErrorMessage errors={errors} name="newTag.notes" />
                  </span>
                </fieldset>

                {saveRes?.error === true && (
                  <div className="message-box">
                    <h3>Sorry! There was some problem.</h3>
                    <p>{saveRes.message}</p>
                  </div>
                )}

                {saveRes?.error === false && saveRes?.activation?.error === true && (
                  <div className="message-box">
                    <h3>Sorry! There was some problem with the activation.</h3>
                    <p>Please correct any errors and try again!</p>
                  </div>
                )}

                <div className="inline-buttons">
                  <button type="submit" className="cta" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving Details...' : 'Save Details'}
                  </button>
                </div>

                {isSubmitting && <LoadingInline>Registering the Tag to your account...</LoadingInline>}
              </div>
            </div>
          )}
        </form>

        {subStep === '3C' && (
          <section className="slide-saved">
            <h1>Congratulations!</h1>
            <h3>You have successfully activated your new Tag</h3>
            <br />
            <p>Do you want to see all your saved Tags?</p>
            <div className="inline-buttons">
              <Link href="/">
                <a>No, Am good</a>
              </Link>
              <Link href="/account/">
                <a className="cta">Yes, Show me</a>
              </Link>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}
