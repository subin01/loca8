// @ts-nocheck
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { verifyTag } from '../../db'
import LoadingInline from '../LoadingInline'
import TagID from '../TagID'
import { iTagID, iTagVerifyResponse } from '../../types'
import { TAG_INVALID, TAG_STATUS_UNREGISTERED } from '../../constants'

interface IProps {
  tid: iTagID
  updateTid(tid: iTagID): void
  updateStep(step: number): void
}

interface IForm {
  tagId: iTagID
}

export default function VerifyTagForm({ tid = '', updateTid, updateStep }: IProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onChange' })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verifyRes, setVerifyRes] = useState<iTagVerifyResponse>(null)

  console.log('verifyRes', verifyRes)

  const onSubmit = async (data: IForm) => {
    const { tagId } = data

    updateStep(1)
    setVerifyRes(null) // clear previous res
    setIsSubmitting(true)
    updateTid(tagId)

    // Call DB API
    const serverRes = await verifyTag({ tid: tagId })

    setVerifyRes(serverRes.data || null)
    setIsSubmitting(false)

    if (serverRes.data.error && serverRes.data.errorType === TAG_INVALID) {
      console.log('InvalidTAG')
      setError('tagId', {
        type: 'invalid',
        message: 'Invalid Tag ID, Please check the Tag ID!',
      })
    } else if (serverRes.data.error === false) {
      updateStep(2)
    }
    if (serverRes.data.errorType === TAG_STATUS_UNREGISTERED) {
      updateStep(3)
    }
  }

  return (
    <section>
      <h1>
        Return <i>or</i> <br />
        Register a Tag
      </h1>
      <div className="form-wrap loadingContainer">
        <form className="form  tag-field-with-cta" onSubmit={handleSubmit(onSubmit)}>
          <TagID tid={tid} register={register} errors={errors}></TagID>
          <button type="submit" className="cta" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        {verifyRes !== null && !verifyRes.error && <h2>Let's return this to the owner!</h2>}
        {verifyRes !== null && !verifyRes.error && verifyRes.message && (
          <div>
            <h4>Here's some message from the owner</h4>
            <div>"{verifyRes.message}"</div>
          </div>
        )}

        {verifyRes !== null && verifyRes.errorType === TAG_STATUS_UNREGISTERED && (
          <div>
            <h3>This is an unregistered Tag, Do you want to register?</h3>
            <p>Note: You would need an Activation Key, to complete the process </p>
          </div>
        )}
        {isSubmitting && <LoadingInline>Verifying Tag details...</LoadingInline>}
      </div>
    </section>
  )
}
