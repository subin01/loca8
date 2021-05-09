import { iTagID } from 'types'

interface IProps {
  tags: [{ tid: iTagID; notes: string }]
}

export default function TagList({ tags }: IProps) {
  return (
    <div className="form tag-list">
      <div className="list-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Tag ID</th>
              <th>Notes</th>
              {/* <th>Activated On</th> */}
            </tr>
          </thead>
          <tbody>
            {tags?.map((tag, i) => {
              return (
                <tr key={tag.tid}>
                  <td>{i + 1}.</td>
                  <td>{tag.tid}</td>
                  <td>{tag.notes}</td>
                  {/* <td>{tag.tid}</td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
