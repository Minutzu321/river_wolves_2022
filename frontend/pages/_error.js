import PageHeader from '../components/PageHeader'

function Error({ statusCode }) {
    return (
      <p>
        {statusCode
          ? <PageHeader titlu={"Eroare!"} subtitlu={{statusCode}} subsubtitlu={"A aparut o eroare la server."}/>
          : <PageHeader titlu={"Eroare!"} subtitlu={"Pagina nu este accesibila"} subsubtitlu={"Va rugam sa reveniti la pagina de inceput."}/>}
      </p>
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error