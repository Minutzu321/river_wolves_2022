import { randomUUID } from "crypto";
import { getSession } from "next-auth/react"
import { getPerm } from "./perm";
import DBClient from "./prismadb";

export default async function autorizeaza(req, res) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401)
    res.end()
  }
  return session;
}

export async function useAuth(req, res){
  const prisma = DBClient.instance;

  //user,sesiune,prisma,acces

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    res.end()

    return [null, null, prisma, 0] as const
  }

  const sesiune = await getSession({ req })
  if (!sesiune) {
    res.status(401)
    res.end();

    return [null, null, prisma, 0] as const
  }

  try {
    
    const user = await prisma.user.findUnique({
      where: {
        email: sesiune.user.email
      },
      select: {
          id: true,
          email: true,
          nume: true,
          telefon: true,
          data_nasterii: true,
          grad: true,
          departament: true,
          sid: true,
          poza: true,
          incredere: true,
          feedback: true,
          feedbackEchipa: true,
          feedbackSedinte: true,
      }
    })

    return [user, sesiune, prisma, getPerm(user.grad, user.incredere)] as const
  }catch{
    res.status(200).json({err:true})
    res.end()

    return [null, null, prisma, -1] as const
  }
}
  

  export async function authProps(context, ignora=false){
    const prisma = DBClient.instance;
    const sesiune = await getSession(context)

    if(!sesiune){
      return [null, null, 0] as const
    }
  
    //user,sesiune,acces
      
      const user = await prisma.user.update({
        where: {
          email: sesiune.user.email
        },
        data:{
          sauth: randomUUID(),
        },
        select: {
            sauth: true,
            email: true,
            nume: true,
            telefon: true,
            data_nasterii: true,
            grad: true,
            departament: true,
            sid: true,
            poza: true,
            incredere: true,
            feedback: true,
            feedbackEchipa: true,
            feedbackSedinte: true,
        }
      })
  
      if(!!user){
        return [user, sesiune, getPerm(user.grad, user.incredere)] as const
      }else{
        const userc = await prisma.user.create({
          data: {
            sauth: randomUUID(),
            email: sesiune.user.email,
            nume: sesiune.user.name,
            grad: ignora?"IGNORAT":"NEAPROBAT"
          },
          select: {
              sauth: true,
              email: true,
              nume: true,
              telefon: true,
              data_nasterii: true,
              grad: true,
              departament: true,
              sid: true,
              poza: true,
              incredere: true,
              feedback: true,
              feedbackEchipa: true,
              feedbackSedinte: true,
          }
        })
        return [userc, sesiune, 0] as const
      }
  
}