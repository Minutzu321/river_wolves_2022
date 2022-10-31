import autorizeaza from "../../../libs/autorizare";
import DBClient from '../../../libs/prismadb'

function cap(str){
  return str.toUpperCase();
}

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    res.end()
    return
  }
  const prisma = DBClient.instance

  const body = req.body
  

  const short = await prisma.short.findUnique({
    where: {
      cod: body.cod,
    }
  })
  

  res.status(200).json({
    succes: !!short,
  })

  
}