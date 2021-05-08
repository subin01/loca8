import User from '@components/User'
// import withAuth from 'HOC/withAuth'
import { useAuth } from 'contexts/AuthContext'
import { GetUser } from 'db'
import TagList from '@components/TagList'

function Account() {
  const { currentUser, logout, auth } = useAuth()

  const USER_UID = currentUser?.uid
  console.log('USER_UID', USER_UID)
  const [user, loadingUser, errorUser] = GetUser(USER_UID)

  return (
    <>
      <h1>Your Account</h1>
      <br />
      <User updateStep={() => {}} />
      {user?.tags && <TagList tags={user.tags} />}
    </>
  )
}

export default Account
// export default withAuth(Account)
