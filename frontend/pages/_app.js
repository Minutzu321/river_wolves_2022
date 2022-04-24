import 'bootstrap/dist/css/bootstrap.css'
import styles from "./styles/now-ui-kit.scss"
import { SessionProvider } from "next-auth/react"

import Head from "next/head";
import Script from 'next/script';


const RiverWolvesApp = ({Component, session, ...pageProps }) => {
    return <>
        <SessionProvider session={session}>
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
                <meta
                name="description"
                content="Site-ul echipei de robotica RiverWolves Tulcea, sponsorizati de Cereal Collect Distribution, Monsson, Ainodekam, Minerva Navis, Liceul Teoretic Grigore Moisil, Societatea Stiintifica Orion"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200&display=optional" rel="stylesheet" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons&display=optional" />
                <link
                href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
                rel="stylesheet"
                />
                <title>River Wolves</title>
            </Head>

            <Component {...pageProps} />

            <Script src="js/core/jquery.min.js" strategy='beforeInteractive'/>
            <Script src="js/core/popper.min.js" strategy='beforeInteractive'/>
            <Script src="js/core/bootstrap.min.js" strategy='beforeInteractive'/>
            <Script src="js/plugins/bootstrap-switch.js" strategy='afterInteractive'/>
            <Script src="js/plugins/nouislider.min.js" strategy='afterInteractive'/>
            <Script src="js/plugins/bootstrap-datepicker.js" strategy='afterInteractive'/>
            <Script src="js/now-ui-kit.js?v=1.3.0" strategy='afterInteractive'/>
        </SessionProvider>

        
    </>
  }
export default RiverWolvesApp