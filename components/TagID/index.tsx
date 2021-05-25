// @ts-nocheck
import { ErrorMessage } from '@hookform/error-message'

import { iTagID } from '../../types'
import { TAG_FORMAT_REGEX } from '../../constants'

interface IProps {
  tid: iTagID
  errors?: {}
  register?: {}
  readOnly: boolean
}

export default function TagID({ tid, readOnly = false, errors, register }: IProps) {
  return (
    <>
      {!readOnly ? (
        <fieldset>
          <label htmlFor="tagId">Tag ID:</label>
          <input
            id="tagId"
            type="tel"
            defaultValue={tid}
            {...register('tagId', {
              required: { value: true, message: 'Tag ID is required' },
              pattern: { value: TAG_FORMAT_REGEX, message: 'Tag ID format is incorrect!' },
            })}
          ></input>
          <span className="inline-error">
            <ErrorMessage errors={errors} name="tagId" />
          </span>
        </fieldset>
      ) : (
        <div className="tag-inline">
          <span className="tid">{tid}</span>
          {errors && (
            <span className="inline-error">
              <ErrorMessage errors={errors} name="tagId" />
            </span>
          )}
        </div>
      )}
    </>
  )
}
