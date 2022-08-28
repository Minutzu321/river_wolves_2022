import Head from 'next/head'
import Aplica from '../components/acasa/Aplica'
import Despre from '../components/acasa/Despre'
import Imagini from '../components/acasa/Imagini'
import Navbar from '../components/Navbar'
import PageFooter  from '../components/PageFooter'
import PageHeader from '../components/PageHeader'

export default function Home() {
  return (
    <div className="landing-page sidebar-collapse">
      <Head>
        <title>River Wolves</title>
      </Head> 
      <Navbar/>
      <div className="wrapper">
        <PageHeader/>
        <div className="main">
          <Despre/>
          <Imagini/>
          <Aplica/>
        </div>
      </div>
      <PageFooter/>
    </div>
  )
}