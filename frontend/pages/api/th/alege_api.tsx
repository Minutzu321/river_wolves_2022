import DBClient from '../../../libs/prismadb'

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Numai metode POST' })
        return
    }

    const body = JSON.parse(req.body)

    const prisma = DBClient.instance;


    await prisma.jucator.update({
        where:{
            sid: body.c,
        },
        data:{
            start: body.muzeu,
        }
    })

    res.status(200)
  

  res.end();

  
  
}