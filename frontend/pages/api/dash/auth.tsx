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

  const body = req.body;
  

  let user;
  
  try {
    user = await prisma.user.findUnique({
      where: {
        email: sesiune.user.email
      },
      select: {
          email:true,
          sid: true,
          nume: true,
          telefon: true,
          data_nasterii: true,
          grad: true,
          departament: true,
          poza: true,
          incredere: true,
          feedbackEchipa:  {
            select:{
              id: true,
            }
          },
          feedbackSedinte: {
            select:{
              id: true,
            }
          },
          participari: {
            select:{
              data_ora: true,
              anulat: true,
              prezent: true,
            }
          },
          primaLogare: true,
      }
    })
  }catch{
    res.status(200).json({err:true})
  }
  

  let infos = true, autorizat = false, taskuri = [];
  //
  //  chiar vorbesc serios
  //
  if(!!user){
    if(user.grad !== "NEAPROBAT" && user.grad !== "IGNORAT" ){
      autorizat = true;
      if(!!user.nume && !!user.telefon && !!user.data_nasterii){
        infos = false;
        const [gtaskuri, upd] = await prisma.$transaction([
          prisma.task.findMany(),
          prisma.user.update({
            where: {
              email: sesiune.user.email,
            },
            data: {
              ultimaActiune: new Date(),
            },
          })
        ])
        taskuri = gtaskuri;
      }
    }else{
      if(!!user.nume && !!user.telefon && !!user.data_nasterii){
        infos = false;
      }
    }
  }else{
    await prisma.user.create({
      data: {
        email: sesiune.user.email,
        nume: sesiune.user.name,
        grad: !body.ign?"NEAPROBAT":"IGNORAT"
      }
    })
  }

  res.status(200).json({
    err: false,
    inf: infos,
    aut: autorizat,
    user: (!body.ign && (infos || !autorizat)) ? undefined : user,
    taskuri: taskuri,
  })



}