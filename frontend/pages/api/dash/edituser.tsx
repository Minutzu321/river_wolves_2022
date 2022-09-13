import { useAuth } from "../../../libs/autorizare";
import { ADMIN_PERM, TEAM_LEADER_PERM } from "../../../libs/config";

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

    let rez = null;

    if(perm < TEAM_LEADER_PERM){
        rez = await prisma.user.update({
            where:{
                email: body.target,
            },
            data:{
                grad: body.grad,
                departament: body.dep,
            }
        });
    }else{
        rez = await prisma.user.update({
            where:{
                email: body.target,
            },
            data:{
                grad: body.grad,
                departament: body.dep,
            }
        });
    }
    
    res.status(200).json({
        err: !!rez,
    })

}