import { useAuth } from "../../../libs/autorizare";
import { ADMIN_PERM } from "../../../libs/config";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;

    if(perm < ADMIN_PERM){
        res.status(401).json({
            err: "Neautorizat",
        })
    }

    const body = req.body;

    const rez = await prisma.user.delete({
        where:{
            email: body.target,
        }
    });
    
    res.status(200).json({
        err: !!rez,
    })

}