import { iTagID } from 'types'

interface IProps {
  tags: [{ tid: iTagID; notes: string; activatedOn: { seconds: number; nanoseconds: number } }]
}

export default function TagList({ tags }: IProps) {
  return (
    <div className="form tag-list">
      <div className="list-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tag ID</th>
              <th>Notes</th>
              <th>Activated On</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(tags).map((tag, i) => {
              const t = new Date(1970, 0, 1) // Epoch
              t.setSeconds(tag.activatedOn.seconds)
              return (
                <tr key={tag.tid}>
                  <td>{i + 1}.</td>
                  <td>{tag.tid}</td>
                  <td>{tag.notes}</td>
                  <td>{t.toDateString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
