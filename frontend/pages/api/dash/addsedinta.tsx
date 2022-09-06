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

    const sedinta = await prisma.sedinta.create({
        data:{
            titlu: body.titlu,
            desc: body.desc,
            data_ora: body.dataOra,
            durata: body.durata,
            departament: body.dep
        }
    })
    
    res.status(200).json({
        sedinta: sedinta,
    })

}