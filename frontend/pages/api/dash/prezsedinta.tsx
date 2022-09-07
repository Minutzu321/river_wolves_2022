import { useAuth } from "../../../libs/autorizare";
import { ADMIN_PERM } from "../../../libs/config";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;
    if(perm < ADMIN_PERM){
        res.status(401).json({
            err: "Neautorizat",
        })
        return;
    }

    const body = req.body;
    

    const participari = await prisma.participare.findMany({
        where:{
            sedintaaId: body.id,
            anulat: false,
        },
        select:{
            user:{
                select:{
                    nume: true
                }
            },
            id: true,
            prezent: true,
        }
    });

    let ts = []

    participari.map((participare)=>{
        ts.push(prisma.participare.update({
            where:{
                id: participare.id
            },
            data:{
                prezent: body.prez.includes(participare.user.nume)
            }
        }))
    })

    const rezs = await prisma.$transaction(ts)    
    
    res.status(200).json({
        participare: participari,
    })

}