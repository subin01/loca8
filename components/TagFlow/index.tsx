import { useState } from 'react'
import VerifyTagForm from '@components/VerifyTagForm'
import ReturnForm from '@components/ReturnForm'
import { iTagID } from 'types'

interface IProps {
  id: iTagID
}

export default function TagFlow({ id }: IProps) {
  const [step, setStep] = useState(1)
  const [tid, setTid] = useState(id)
  return (
    <>
      <h2>Step:{step}</h2>
      {step >= 1 && <VerifyTagForm tid={tid} updateStep={setStep} updateTid={setTid} />}
      {step === 2 && <ReturnForm tid={tid} updateStep={setStep} />}
    </>
  )
}
