import User from '@components/User'
// import withAuth from 'HOC/withAuth'
import { useAuth } from 'contexts/AuthContext'
import { GetUser } from 'db'
import TagList from '@components/TagList'

function Account() {
  const { currentUser } = useAuth()

  const USER_UID = currentUser?.uid
  console.log('USER_UID', USER_UID)
  const [user] = GetUser(USER_UID)
  console.log('user', user)

  return (
    <>
      <h1>Your Account</h1>
      <section className="marginBottom1">
        <User updateStep={() => {}} />
      </section>

      {user && (
        <section>
          <h2>Your Registered Tags</h2>
          {user.tags && user.tags?.length > 0 ? (
            <TagList tags={user.tags} />
          ) : (
            <div className="message-box">There are no Tags registered to this account!</div>
          )}
        </section>
      )}
    </>
  )
}

export default Account
// export default withAuth(Account)
