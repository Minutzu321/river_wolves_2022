import DBClient from '../../../libs/prismadb'
import autorizeaza from '../../../libs/autorizare'


export default async (req, res) => {
  
  const sesiune = await autorizeaza(req, res);
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    return
  }
  if (!sesiune) return
  
  const prisma = DBClient.instance

  const etaje = await prisma.etaj.findMany()
  res.status(200).json(etaje)
  
  
  res.end()
}