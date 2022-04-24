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
  
  await prisma.indiciu.delete({
    where: {
      id: body.id,
    },
  })

  res.status(200).json({succes: true})
  
  
  res.end()
}