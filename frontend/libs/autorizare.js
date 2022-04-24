import { getSession } from "next-auth/react"

export default async function autorizeaza(req, res) {
    const session = await getSession({ req })
    if (!session) {
      res.status(401)
      res.end()
    }
    return session;
  }