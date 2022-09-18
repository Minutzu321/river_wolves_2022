import { useAuth } from "../../../libs/autorizare";
import { VOLUNTAR_PERM } from "../../../libs/config";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;
    // if(perm < VOLUNTAR_PERM){
    //   res.status(401).json({
    //       err: "Neautorizat",
    //   })
    //   return;
    // }

    const sedinte = await prisma.sedinta.findMany({
        include:{
          participari: {
            include:{
              user: {
                select:{
                  nume: true,
                  departament: true,
                  grad: true,
                }
              }
            }
          }
        }
      });
    
    res.status(200).json({
        sedinte: sedinte,
    })

}