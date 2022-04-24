import DBClient from '../../../libs/prismadb'
import autorizeaza from '../../../libs/autorizare'


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
        nume: true,
        email: true,
        telefon: true,
        data_nasterii: true,
        grad: true,
        departament: true,
     }
  })
  
  res.status(200).json({useri: useri})
  
  
  res.end()
}