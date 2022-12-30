import { NextPage } from 'next'
import Campaign from 'Components/Templates/Campaign/Campaign'
import Header from 'Components/Templates/Header/Header'
import Footer from 'Components/Templates/Footer/Footer'

export const IndexPage: NextPage = () => {
  return (
    <>
      {/* <Header /> */}
      <Campaign currentUser={null} />
      <Footer />
    </>
  )
}

export default IndexPage
