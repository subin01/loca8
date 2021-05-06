import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { verifyTag } from 'db'
import Link from 'next/link'
import { ErrorMessage } from '@hookform/error-message'
import LoadingInline from '@components/LoadingInline'
import TagID from '@components/TagID'
import { ITagID, ITagVerifyResponse, TAG_INVALID, TAG_STATUS_UNREGISTERED } from 'types'
import { validateTagFormat } from 'utils'

interface IProps {
  tid: ITagID
  updateTid(tid: ITagID): void
  updateStep(step: number): void
}

interface IForm {
  tagId: ITagID
}

export default function VerifyTagForm({ tid = '', updateTid, updateStep }: IProps) {
  const [tagNumber, setTagNumber] = useState(tid)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onChange' })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verifyRes, setVerifyRes] = useState<ITagVerifyResponse>({})

  const onSubmit = async (data: IForm) => {
    const { tagId } = data
    setVerifyRes({}) // clear previous res
    setIsSubmitting(true)
    setTagNumber(tagId)
    updateTid(tagId)

    // Call DB API
    const tagRes = await verifyTag({ tid: tagId })

    setVerifyRes(tagRes?.data || {})
    setIsSubmitting(false)

    if (tagRes.data.error && tagRes.data.errorType === TAG_INVALID) {
      console.log('InvalidTAG')
      setError('tagId', {
        type: 'invalid',
        message: 'Invalid Tag ID, Please check the Tag ID!',
      })
    } else if (tagRes.data.error === false) {
      updateStep(2)
    }
  }

  return (
    <div className="form-wrap">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="box">
          <h2>Please verify tag details</h2>
          <div className="inline loadingContainer">
            <TagID tid={tid} register={register} errors={errors}></TagID>
            <button type="submit" className="cta" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
            {isSubmitting && <LoadingInline>Verifying Tag details...</LoadingInline>}
          </div>

          {!verifyRes.error && verifyRes.message && (
            <div>
              <h2>Here's some message from the owner</h2>"{verifyRes.message}"
            </div>
          )}
        </div>
      </form>
      {verifyRes.errorType === TAG_STATUS_UNREGISTERED && (
        <div className="box">
          <h3>This is an unregistered Tag, Do you want to register?</h3>
          <p>Note: You would need an Activation Key, to complete the process </p>
          <hr></hr>
          <div className="buttons-container">
            <Link href={`/register/${tagNumber}`}>
              <a className="cta">Continue to Registration</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
