import { ErrorMessage } from '@hookform/error-message'

import { iTagID } from 'types'
import { validateTagFormat } from 'utils'

interface IProps {
  tid: iTagID
  errors: {}
  register: {}
}

export default function TagID({ tid, errors, register }: IProps) {
  return (
    <fieldset>
      <label htmlFor="tagId">Tag ID:</label>
      <input
        id="tagId"
        defaultValue={tid}
        {...register('tagId', {
          required: { value: true, message: 'Tag ID is required!' },
          validate: validateTagFormat,
        })}
      ></input>
      <span className="inline-error">
        <ErrorMessage errors={errors} name="tagId" />
        {errors.tagId?.type === 'validate' && 'Tag ID format is incorrect!'}
      </span>
    </fieldset>
  )
}
