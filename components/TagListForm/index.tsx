import { iTagID } from 'types'
import { ErrorMessage } from '@hookform/error-message'

interface IProps {
  tags: [{ tid: iTagID; notes: string }]
  errors: {}
  register: {}
}

export default function TagListForm({ tags, errors, register }: IProps) {
  return (
    <div className="form tag-list">
      <h2>All your registered Tags</h2>
      {tags?.map((tag, i) => {
        const fieldName = `tags[${i}]`
        return (
          <div className="inline" key={tag.tid}>
            <fieldset>
              <span className="tagId">{tag.tid}</span>
            </fieldset>
            <fieldset className="note">
              <input type="hidden" defaultValue={tag.tid} {...register(`${fieldName}.tid`, { required: true })}></input>
              <input
                id="notes"
                disabled
                defaultValue={tag.notes}
                {...register(`${fieldName}.notes`, {
                  required: { value: true, message: 'Note is required!' },
                  minLength: { value: 3, message: 'Note is required!' },
                })}
              ></input>
              <span className="inline-error">
                <ErrorMessage errors={errors} name={`${fieldName}.notes`} />
              </span>
            </fieldset>
          </div>
        )
      })}
    </div>
  )
}
