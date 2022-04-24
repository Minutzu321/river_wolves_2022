import DBClient from '../../../libs/prismadb'
import autorizeaza from '../../../libs/autorizare'


export default async (req, res) => {
  
  const sesiune = await autorizeaza(req, res);
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    return
  }
  if (!sesiune) return

  const body = JSON.parse(req.body)
  
  const prisma = DBClient.instance
  const user = await prisma.user.update({
    where: {
      email: sesiune.user.email
    },
    data: {
      nume: body.nume,
      telefon: body.tel,
      data_nasterii: body.data_nastere,
      ultimaActiune: new Date()
    },
  })

  res.status(200).json({succes: true})
  
  
  res.end()
}