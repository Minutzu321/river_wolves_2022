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

  const user = await prisma.user.update({
    where:{
      email: sesiune.user.email
    },
    data:{
      nume: body.nume,
      telefon: body.tel,
      data_nasterii: new Date(body.dat),
      ultimaActiune: new Date(),
    }
  })
  

  res.status(200).json({
    acceptat: user.acceptat,
  })

  console.log(new Date(req.body.dat));
  
}