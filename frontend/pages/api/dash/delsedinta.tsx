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

    let ts = [
        prisma.sedinta.deleteMany({
            where:{
                id: body.id,
            }
        })
    ]

    if(body.delrec){
        if(body.ref > -1){
            ts.push(
                prisma.sedinta.deleteMany({
                    where:{
                        OR: [
                            {ref: body.ref,},
                            {id: body.ref},
                        ],
                        data_ora:{
                            gte: new Date(body.data_ora)
                        }
                    }
                })
            )
        }else{
            ts.push(
                prisma.sedinta.deleteMany({
                    where:{
                        ref: body.id,
                        data_ora:{
                            gte: new Date(body.data_ora)
                        }
                    }
                })
            )
        }
    }

    const rez = await prisma.$transaction(ts)
    
    res.status(200).json({
        err: !!rez,
    })

}