import { useAuth } from "../../../libs/autorizare";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;

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