// @ts-nocheck
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { verifyTag } from 'db'
import Link from 'next/link'
import LoadingInline from '@components/LoadingInline'
import TagID from '@components/TagID'
import { iTagID, iTagVerifyResponse } from 'types'
import { TAG_INVALID, TAG_STATUS_UNREGISTERED } from 'global_constants'

interface IProps {
  tid: iTagID
  updateTid(tid: iTagID): void
  updateStep(step: number): void
}

interface IForm {
  tagId: iTagID
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
  const [verifyRes, setVerifyRes] = useState<iTagVerifyResponse>({})

  const onSubmit = async (data: IForm) => {
    const { tagId } = data
    setVerifyRes({}) // clear previous res
    setIsSubmitting(true)
    setTagNumber(tagId)
    updateTid(tagId)

    // Call DB API
    const serverRes = await verifyTag({ tid: tagId })

    setVerifyRes(serverRes?.data || {})
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
  }

  return (
    <div className="box">
      <div className="form-wrap">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Please verify tag details</h2>
          <div className="inline loadingContainer">
            <TagID tid={tid} register={register} errors={errors}></TagID>
            <button type="submit" className="cta" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
            {isSubmitting && <LoadingInline>Verifying Tag details...</LoadingInline>}
          </div>

          {!verifyRes === {} && !verifyRes.error && <h2>Let's return this to the owner!</h2>}
          {!verifyRes === {} && !verifyRes.error && verifyRes.message && (
            <div>
              <h4>Here's some message from the owner</h4>
              <div>"{verifyRes.message}"</div>
            </div>
          )}
        </form>
      </div>

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
