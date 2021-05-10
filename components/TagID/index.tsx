// @ts-nocheck
import { ErrorMessage } from '@hookform/error-message'

import { iTagID } from 'types'
import { validateTagFormat } from 'utils'

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
            defaultValue={tid}
            maxLength="8"
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
      ) : (
        <div className="tag-inline">
          <span className="tid">{tid}</span>
          {errors && (
            <span className="inline-error">
              <ErrorMessage errors={errors} name="tagId" />
              {errors.tagId?.type === 'validate' && 'Tag ID format is incorrect!'}
            </span>
          )}
        </div>
      )}
    </>
  )
}
