import DBClient from '../../../libs/prismadb'
import autorizeaza from '../../../libs/autorizare'


export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    return
  }

  const body = JSON.parse(req.body)
  
  const prisma = DBClient.instance
  
  let user = await prisma.jucator.findUnique({
    where: {
      sid: body.cod
    },
    select: {
      id: true,
      nume: true,
      telefon: true,
      muzee: true,
      start: true,
   }
  })
  
  res.status(200).json({rez: user})
  
  
  res.end()
}