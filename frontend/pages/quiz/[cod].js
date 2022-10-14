import { useRouter } from 'next/router'

const QuizDeLaCod = () => {
  const router = useRouter()
  const { cod } = router.query

  return <p>Codul este: {cod}</p>
}
export async function getServerSideProps(context) {
    const { cod } = context.query;

    console.log(cod);

    return {
        props: {
            cod: cod,
        }
    }
}
export default QuizDeLaCod