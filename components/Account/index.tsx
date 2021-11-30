import { GetUser } from '../../db'
import { useAuth } from '../../contexts/AuthContext'
import User from '../../components/User'
import TagList from '../../components/TagList'

function Account() {
  const { currentUser } = useAuth()

  const USER_UID = currentUser?.uid
  console.log('USER_UID', USER_UID)
  const [user] = GetUser(USER_UID)
  console.log('user', user)

  return (
    <>
      <section className="marginBottom1">
        <User updateStep={() => {}} />
      </section>

      {user && (
        <section>
          <h2>Your Registered Tags</h2>

          {user.tags && Object.values(user.tags).length > 0 ? (
            <TagList tags={user.tags} />
          ) : (
            <div className="message-box icon-info marginTop1">There are no Tags registered to this account!</div>
          )}
        </section>
      )}
    </>
  )
}

export default Account
// export default withAuth(Account)
