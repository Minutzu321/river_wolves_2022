import { useAuth } from "../../../libs/autorizare";
import { ADMIN_PERM } from "../../../libs/config";
import { addZile } from "../../../libs/data";

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
            recurenta: body.rec,
            departament: body.dep
        }
    })

    if(body.rec){
        let dat = new Date(body.dataOra);

        let seds = []

        let n = 7;
        
        while(n <= 48 && dat.getMonth() !== 6){
            dat = addZile(n, new Date(body.dataOra));
            
            seds.push({
                titlu: body.titlu,
                desc: body.desc,
                data_ora: dat,
                durata: body.durata,
                recurenta: body.rec,
                departament: body.dep,
                ref: sedinta.id,
            })

            n+=7;
        }

        await prisma.sedinta.createMany({
            data: seds,
            skipDuplicates: true,
          })
    }
    
    res.status(200).json({
        create: true,
    })

}