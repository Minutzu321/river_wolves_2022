import React from 'react'
import { getToken } from "next-auth/jwt"

export default function Membru(props) {
  return (
    <div>Membru</div>
  )
}

export async function getServerSideProps(req, res) {
    const secret = process.env.JWT_SECRET
    const token = await getToken({ req, secret })
    console.log("JSON Web Token", token)
    const sesiune = await getSession(req);
    console.log(sesiune);
    return {
        props: {
          data: false,
        },
      }
}
