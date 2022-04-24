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

  let indicii = {}

  if(body.email){
    indicii = await prisma.indiciu.findMany({
      where: {
        creator: body.email
      },
      include: {
        etaj: true,
      },
    })
  }else{
    indicii = await prisma.indiciu.findMany({
      include: {
        etaj: true,
      }
    })
  }
  

  res.status(200).json(indicii)
  
  
  res.end()
}