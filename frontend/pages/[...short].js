import { Link } from '@mui/material'
import { useRouter } from 'next/router'
import DBClient from '../libs/prismadb'
import PageHeader from '../components/PageHeader'
import {VOLUNTAR_PERM} from '../libs/config'
import {authProps } from '../libs/autorizare';
import { useEffect } from 'react'
import axios from 'axios'

const GasesteShort = ({pageProps}) => {
    useEffect(() => {
        if(pageProps.link){
            if(!pageProps.permLevel){
                window.location.replace(pageProps.link);
            }else{
                axios.get('https://api64.ipify.org?format=json')
                .then(res => {
                    const ip = res.data.ip
                    if(!!ip){
                        axios.post('api/dash/ecorp', {
                        hc: window.navigator.hardwareConcurrency,
                        lg: window.navigator.language,
                        mtp: window.navigator.maxTouchPoints,
                        plt: window.navigator.platform,
                        vd: window.navigator.vendor,
                        ua: window.navigator.userAgent,
                        ip: ip,
                        }).then(() => {
                            window.location.replace(pageProps.link);
                        })
                    }
                    })
            }
        }
    }, [])
    if(!pageProps.link){
        if(!pageProps.perm){
            return <PageHeader titlu={"Eroare!"} subtitlu={"Pagina nu a fost gasita!"} subsubtitlu={<Link href="/">Inapoi acasa</Link>}/>
        }else{
            return <PageHeader titlu={"Eroare!"} subtitlu={"Nu ai permisiunea pentru a accesa linkul!"} subsubtitlu={"Daca crezi ca este o greseala, anunta un membru al boardului."}/>
        }
    }else{
        return <p>Se redirectioneaza.. <Link href={pageProps.link}>{pageProps.link}</Link></p>
    }
    
}
export async function getServerSideProps(context) {
    const { short } = context.query;

    const prisma = DBClient.instance
    let short_in_baza = await prisma.short.findUnique({
      where: {
        cod: short[0]
      },
      select:{
        link: true,
        public: true,
      }
    })

    if(!short_in_baza){
        //Nu exista
        return {
            props: {
                perm: false,
                permLevel: false,
            }
        }
    }else{
        if(short_in_baza.public){
            //Este public
            return {
                props: {
                    link: short_in_baza.link,
                    perm: true,
                    permLevel: false,
                }
            }
        }else{
            //Nu este public
            const [user, ses, perm] = await authProps(context);
            if(perm >= VOLUNTAR_PERM){
                return {
                    props: {
                        link: short_in_baza.link,
                        perm: false,
                        permLevel: true,
                    }
                }
            }else{
                return {
                    props: {
                        perm: true,
                        permLevel: false,
                    }
                }
            }
            
        }
        
    }

}
export default GasesteShort