import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateUserProfile } from 'db'

export default function RegisterForm({ tid = '', user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  // console.log('ERRPRS', errors)
  const [disabled, setDisabled] = useState(false)

  const onSubmit = async (data) => {
    const { displayName, newTag, phone, tags } = data
    setDisabled(true)
    console.log('Edit Profile ', data)
    const email = user?.email || ''
    const response = await updateUserProfile({ email, displayName, newTag, phone, tags })
    console.log('Edit Profile submit', response.data, response.data.error)

    // setTimeout(() => {
    //   history.push('/matches')
    // }, 500)
  }

  return (
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
            {...register('phone', { required: true, pattern: /^[789]\d{9}$/ })}
          ></input>
          <span className="inline-error">
            {errors?.phone?.type === 'required' && 'Mobile number is required'}
            {errors?.phone?.type === 'pattern' && 'Mobile number format is incorrect!'}
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
            {...register('displayName', { required: true, minLength: 3, maxLength: 20 })}
          ></input>
          <span className="inline-error">
            {errors?.displayName?.type === 'required' && 'Name is required'}
            {errors?.displayName?.type === 'minLength' && 'Name is required, min 3 characters'}
            {errors?.displayName?.type === 'maxLength' && 'Name is required to be under 20 characters'}
          </span>
        </fieldset>
        <br></br>
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
                  {...register(`${fieldName}.notes`, { required: true, minLength: 3 })}
                ></input>
                <span className="inline-error">
                  {errors?.tags?.[i]?.notes?.type === 'required' && 'Note is required!'}
                  {errors?.tags?.[i]?.notes?.type === 'minLength' && 'Note is required!'}
                </span>
              </fieldset>
            </div>
          )
        })}
      </div>
      <div className="box">
        <h2>Step 3: New Tag details</h2>

        <p>So we can contact you in case of a lost & found situation. This will NOT leave our system!</p>
        <div className="inline">
          <fieldset>
            <label htmlFor="newTag.tid">Tag ID:</label>
            <input
              id="newTag.tid"
              defaultValue={tid}
              {...register('newTag.tid', { required: true, minLength: 6 })}
            ></input>
            <span className="inline-error">
              {errors?.newTag?.tid?.type === 'required' && 'Tag ID is required!'}
              {errors?.newTag?.tid?.type === 'minLength' && 'Tag ID format is incorrect!'}
            </span>
          </fieldset>
          <fieldset>
            <label htmlFor="code">Activation Code:</label>
            <input id="code" {...register('newTag.code', { required: true, minLength: 4 })}></input>
            <span className="inline-error">
              {errors?.newTag?.code?.type === 'required' && 'Activation code is required!'}
              {errors?.newTag?.code?.type === 'minLength' && 'Activation code format is incorrect!'}
            </span>
          </fieldset>
        </div>
        <fieldset className="note">
          <label htmlFor="newTag.notes">
            Notes: <span>(Example: My second set of keys for apartment)</span>
          </label>
          <input id="newTag.notes" {...register('newTag.notes', { required: true, minLength: 3 })}></input>
          <span className="inline-error">
            {errors?.newTag?.notes?.type === 'required' && 'Notes is required!'}
            {errors?.newTag?.notes?.type === 'minLength' && 'Notes is required!'}
          </span>
        </fieldset>
      </div>
      <button type="submit" className="cta">
        Save Details
      </button>
    </form>
  )
}
