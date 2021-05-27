// @ts-nocheck
import { ErrorMessage } from '@hookform/error-message'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { iTagID } from '../../types'
import { TAG_FORMAT_REGEX } from '../../constants'

interface IProps {
  tid: iTagID
  errors?: {}
  control?: {}
  readOnly: boolean
}

export default function TagID({ tid, readOnly = false, errors, control }: IProps) {
  return (
    <>
      {!readOnly ? (
        <fieldset>
          <label htmlFor="tagId">Tag ID:</label>
          <Controller
            name="tagId"
            control={control}
            defaultValue={tid}
            rules={{
              required: { value: true, message: 'Tag ID is required' },
              pattern: { value: TAG_FORMAT_REGEX, message: 'Tag ID format is incorrect!' },
            }}
            render={({ field: { onChange, value } }) => (
              <InputMask mask="9999-9999" value={value} maskChar={null} onChange={onChange}>
                {(inputProps) => (
                  <input {...inputProps} type="tel" id="tagId" className="tag-or-key" autocomplete="off" />
                )}
              </InputMask>
            )}
          />
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
