import { useState } from 'react'
import VerifyTagForm from '@components/VerifyTagForm'
import ReturnForm from '@components/ReturnForm'
import { iTagID } from 'types'

interface IProps {
  id: iTagID
}

export default function ReturnFlow({ id }: IProps) {
  const [step, setStep] = useState(2)
  const [tid, setTid] = useState(id)
  return (
    <>
      {step > 0 && <VerifyTagForm tid={tid} updateStep={setStep} updateTid={setTid} />}
      {step > 1 && <ReturnForm tid={tid} />}
    </>
  )
}
