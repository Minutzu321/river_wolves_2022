import { useAuth } from "../../../libs/autorizare";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;

    const sedinte = await prisma.sedinta.findMany({
        include:{
          participari: {
            include:{
              user: true
            }
          }
        }
      });
    
    res.status(200).json({
        sedinte: sedinte,
    })

}