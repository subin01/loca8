import { useState } from 'react'
import VerifyTagForm from '../VerifyTagForm'
import ReturnForm from '../ReturnForm'
import User from '../User'
import TagID from '../TagID'
import RegisterForm from '../RegisterForm'
import { iTagID } from '../../types'
import { useAuth } from '../../contexts/AuthContext'
import { GetUser } from '../../db'

interface IProps {
  id: iTagID
}

export default function TagFlow({ id }: IProps) {
  const { currentUser } = useAuth()
  // TODO: Replcae GetUser with callable
  const [user] = GetUser(currentUser?.uid)

  const [step, setStep] = useState(1)
  const [tid, setTid] = useState(id)

  return (
    <>
      {step === 1 && <VerifyTagForm tid={tid} updateStep={setStep} updateTid={setTid} />}
      {step === 2 && <ReturnForm tid={tid} updateStep={setStep} />}
      {step === 3 && !user && (
        <section className="slide-user">
          <h4>
            Register Tag <TagID tid={tid} readOnly />
          </h4>
          <User updateStep={setStep} />
        </section>
      )}
      {step === 3 && user && <RegisterForm tid={tid} user={user} />}
    </>
  )
}
