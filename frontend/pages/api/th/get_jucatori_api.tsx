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

  let jucatori = {}

  if(body.email){
    jucatori = await prisma.jucator.findMany({
      where: {
        creator: body.email
      },
    })
  }else{
    jucatori = await prisma.jucator.findMany({
      include: {
        indicii: true,
      }
    })
  }
  

  res.status(200).json(jucatori)
  
  
  res.end()
}