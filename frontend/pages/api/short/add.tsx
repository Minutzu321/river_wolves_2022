import autorizeaza, { useAuth } from "../../../libs/autorizare";
import { ADMIN_PERM, MEMBRU_PERM } from "../../../libs/config";
import DBClient from '../../../libs/prismadb'

function cap(str){
  return str.toUpperCase();
}

export default async (req, res) => {
  const [user, ses, prisma, perm] = await useAuth(req, res)
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    res.end()
    return
  }
  if(!user) return;
  if(perm < MEMBRU_PERM){
      res.status(401).json({
          err: "Neautorizat",
      })
      return;
  }

  const body = req.body
  
  const ishort = await prisma.short.findUnique({
    where: {
      cod: body.cod,
    }
  })


  if(!ishort){
    await prisma.short.create({
      data: {
        cod: body.cod,
        creatorId: user.id,
        link: body.link,
        editor: user.nume,
        public: body.public,
      }
    })
    res.status(200).json({
      succes: true,
    })
    return;
  }

  
  

  res.status(200).json({
    succes: false,
  })

  
}