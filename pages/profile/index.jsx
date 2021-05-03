import Header from '@components/Header'
import Footer from '@components/Footer'
import withAuth from 'HOC/withAuth'

function Profile() {
  return (
    <>
      <Header></Header>
      <h1>Profile Page</h1>
      <Footer></Footer>
    </>
  )
}

export default withAuth(Profile)
