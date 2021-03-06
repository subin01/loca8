import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import InputMask from 'react-input-mask'

import { TAG_FORMAT_REGEX } from '../../constants'
import { updateUserProfile, analytics } from '../../db'
import Link from 'next/link'
import TagID from '../TagID'
import Phone from '../Phone'

import LoadingInline from '../LoadingInline'
import Banner from '../../components/Banner'

export default function RegisterForm({ tid = '', user }) {
  const [subStep, setSubStep] = useState('3A')

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  // console.log('ERRORS', errors)
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

    analytics().logEvent('register_form_submitted')
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
    <>
      <Banner size="tiny">
        <h1>Register Tag </h1>
        <h3>
          <TagID tid={tid} readOnly control={control} errors={errors} />
        </h3>
      </Banner>
      <main className="form-wrap">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {subStep === '3A' && (
            <>
              <div className="headings">
                <h2>Make sure your details are correct</h2>
                <p className="marginBottom2">
                  So we can contact you in case of a lost & found situation. <br></br>Don't worry, it will NOT leave our
                  system!
                </p>
              </div>

              <Phone defaultValue={user?.phone} control={control} errors={errors} />

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
              <div className="headings">
                <h2>New Tag details</h2>
                <p>You need an Activation key to register this Tag to your account.</p>
              </div>
              <div>
                <input type="hidden" defaultValue={tid} {...register('newTag.tid', {})} />

                <fieldset>
                  <label htmlFor={'newTag.key'}>Activation Key:</label>
                  <Controller
                    name={'newTag.key'}
                    control={control}
                    rules={{
                      required: { value: true, message: 'Activation key is required' },
                      pattern: { value: TAG_FORMAT_REGEX, message: 'Activation key format is incorrect!' },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <InputMask mask="9999-9999" value={value} maskChar={null} onChange={onChange}>
                        {(inputProps) => <input {...inputProps} type="tel" id={'newTag.key'} className="tag-or-key" />}
                      </InputMask>
                    )}
                  />
                  <span className="inline-error">
                    <ErrorMessage errors={errors} name={'newTag.key'} />
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
                      maxLength: { value: 25, message: 'Keep the notes under 25 characters!' },
                    })}
                  ></input>
                  <span className="inline-error">
                    <ErrorMessage errors={errors} name="newTag.notes" />
                  </span>
                </fieldset>

                {saveRes?.error === true && (
                  <div className="message-box icon-error">
                    <h3>Sorry! There was some problem.</h3>
                    <p>{saveRes.message}</p>
                  </div>
                )}

                {saveRes?.error === false && saveRes?.activation?.error === true && (
                  <div className="message-box icon-error">
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
            <h2>Congratulations!</h2>
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
      </main>
    </>
  )
}
