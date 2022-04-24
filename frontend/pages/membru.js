import Head from 'next/head'
import { useSession, signIn, getSession} from "next-auth/react"
import Membru from '../components/membru/Membru'
import DBClient from '../libs/prismadb'
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
function PaginaMembru(props) {
    const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath);
    }

    // useEffect(() => socketInitializer(), [])

    

    const { data: session } = useSession()
    if (session) {
      return(
      <div className="landing-page sidebar-collapse">
        <Navbar laMembru={true}/>
        <div className="wrapper">
        <PageHeader titlu="River Wolves" subtitlu="Team management system"/>
          <div className="main">
            <Membru userData={props.pageProps} refData={refreshData}/>
          </div>
        </div>
        <PageFooter/>
      </div>
      )
    }
    return (
        <div className="landing-page sidebar-collapse">
        <Head>
          <title>River Wolves - Login</title>
        </Head>
        <Navbar/>
        <div className="wrapper">
        <PageHeader titlu="River Wolves" subtitlu="Team management system"/>
            <div className="main section container text-center">
                <div className="card text-center">
                    <div className="card-header mt-2">
                        Cine esti?
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">Ups, trebuie sa te loghezi!</h4>
                        <p className="card-text">Pentru a accesa aceasta pagina trebuie sa te loghezi cu contul Google</p>
                        <button onClick={() => signIn()} className="btn btn-primary">Logheaza-te</button>
                    </div>
                    <div className="card-footer text-muted mb-2">
                        Daca te loghezi pentru prima oara, va dura ceva pana administratorul iti va aproba contul.
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}

export default PaginaMembru

export async function getServerSideProps(context) {
  const sesiune = await getSession(context)
  
  if(sesiune){
    const prisma = DBClient.instance
    let user = await prisma.user.findUnique({
      where: {
        email: sesiune.user.email
      },
      select: {
        email: true,
        nume: true,
        telefon: true,
        data_nasterii: true,
        grad: true,
        departament: true,
        incredere: true
     }
    })

    

    if(!user){
      user = await prisma.user.create({
        data:{
          email: sesiune.user.email,
          nume: sesiune.user.name
        }
      })
    }else{
      await prisma.user.update({
        where: {
          email: sesiune.user.email
        },
        data: {
          ultimaActiune: new Date()
        },
      })
    }

    if(user.data_nasterii){
      user.data_nasterii = user.data_nasterii.toJSON();
    }

    if(user.primaLogare){
      user.primaLogare = user.primaLogare.toJSON();
    }

    if(user.ultimaActiune){
      user.ultimaActiune = user.ultimaActiune.toJSON();
    }

    return {
      props: {
        data: user,
      },
    }
  }

  return {
    props: {
      data: false,
    },
  }
}