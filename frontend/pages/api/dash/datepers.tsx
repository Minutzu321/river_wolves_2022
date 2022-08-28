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

  const body = req.body

  await prisma.user.update({
    where:{
      email: sesiune.user.email
    },
    data:{
      nume: body.nume.trim(),
      telefon: body.tel,
      data_nasterii: new Date(body.dat),
      ultimaActiune: new Date(),
    }
  })
  

  res.status(200)

  
}