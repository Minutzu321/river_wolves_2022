
import { useSession, signIn, getSession} from "next-auth/react"
import { getToken } from "next-auth/jwt"

function PaginaMembru(props) {
  return (
    <div>a</div>
  )
}

export default PaginaMembru

export async function getServerSideProps(context) {
  const secret = process.env.JWT_SECRET
  const req = context.req;
  const token = await getToken({ req, secret })
  console.log("JSON Web Token", token)
  const sesiune = await getSession(context);
  console.log(sesiune);
  return {
      props: {
        data: false,
      },
    }
}