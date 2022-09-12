import { useAuth } from "../../../libs/autorizare";
import { ADMIN_PERM, VOLUNTAR_PERM } from "../../../libs/config";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;
    if(perm < VOLUNTAR_PERM){
        res.status(401).json({
            err: "Neautorizat",
        })
        return;
      }

      let membri = undefined

      if(perm >= ADMIN_PERM){
        membri = await prisma.user.findMany({
            where:{
                NOT : {
                    email: user.email,
                }
            },
            select:{
                email: true,
                nume: true,
                telefon: true,
                data_nasterii: true,
                poza: true,
                incredere: true,

                grad: true,
                departament: true,

                participari: true,

                primaLogare: true,
                ultimaActiune: true,

                feedbackSedinte: true,
                feedbackEchipa: true,
                feedback: true,
            }
        });
    }else{
        membri = await prisma.user.findMany({
            where:{
                NOT : {
                    email: user.email,
                }
            },
            select:{
                email: true,
                nume: true,
                telefon: true,
                data_nasterii: true,
                poza: true,
                incredere: true,

                grad: true,
                departament: true,

                participari: true,

                primaLogare: true,
            }
        });
    }
    
    res.status(200).json({
        membri: membri,
    })

}