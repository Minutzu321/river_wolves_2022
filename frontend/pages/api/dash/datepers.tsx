import autorizeaza from "../../../libs/autorizare";
import DBClient from '../../../libs/prismadb'

function cap(str){
  return str.toUpperCase();
}

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
  

  const cineva = await prisma.user.findUnique({
    where:{
      telefon: body.tel,
    }
  })

  if(!!cineva){
    res.status(200).json({
      succes: false,
    })
    return;
  }

  await prisma.user.update({
    where:{
      email: sesiune.user.email
    },
    data:{
      nume: cap(body.nume.trim()),
      telefon: body.tel,
      data_nasterii: new Date(body.dat),
      ultimaActiune: new Date(),
    }
  })
  

  res.status(200).json({
    succes: true,
  })

  
}