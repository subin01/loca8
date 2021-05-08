import { iTagID } from 'types'

interface IProps {
  tags: [{ tid: iTagID; notes: string }]
}

export default function TagList({ tags, errors, register }: IProps) {
  return (
    <div className="form tag-list">
      <h2>All your registered Tags</h2>
      <table>
        <tr>
          <th>Tag ID</th>
          <th>Notes</th>
          {/* <th>Activated On</th> */}
        </tr>
        {tags?.map((tag, i) => {
          return (
            <tr key={tag.tid}>
              <td>{tag.tid}</td>
              <td>{tag.notes}</td>
              {/* <td>{tag.tid}</td> */}
            </tr>
          )
        })}
      </table>
    </div>
  )
}
