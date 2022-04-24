import DBClient from '../../../libs/prismadb'



export default async (req, res) => {
  
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    return
  }

  const body = JSON.parse(req.body);

  const prisma = DBClient.instance;

  const c = body.c
  

  if(!!c){
    await prisma.jucator.update({
        where: {
          sid: c
        },
        data:{
            nume: body.nume,
            telefon: body.tel,
          }
    })
    res.status(200).json({succes: true})
  }else{
    res.status(401)
  }
  res.end()
}