import autorizeaza from "../../../libs/autorizare";
import DBClient from '../../../libs/prismadb'

export default async (req, res) => {

 const sesiune = await autorizeaza(req, res);
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    res.end()
    return
  }
  if (!sesiune) return

  const prisma = DBClient.instance
  const useri = await prisma.user.findMany({
    select: {
        email:true,
        nume: true,
        telefon: true,
        data_nasterii: true,
        grad: true,
        departament: true,
        sid: true,
        acceptat: true,

     }
  })
  
  res.status(200).json({useri: useri})



}