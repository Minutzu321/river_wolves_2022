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

    const rez = await prisma.sedinta.update({
        where:{
            id: body.id,
        },
        data:{
            departament: body.dep,
            data_ora: body.dataOra,
            durata: body.durata,
            titlu: body.titlu,
            desc: body.desc,
        }
    });
    
    res.status(200).json({
        err: !!rez,
    })

}