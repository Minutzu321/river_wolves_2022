import { useAuth } from "../../../libs/autorizare";
import { ADMIN_PERM } from "../../../libs/config";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;

    const body = req.body;

    const trg = await prisma.user.findFirst({
        where:{
            sid: body.sid
        },
        
    })
    

    let participare = await prisma.participare.findFirst({
        where:{
            userrId: trg.id ,
            sedintaaId: Number.parseInt(body.id),
        },
        
    })
    

    if(!participare){
        participare = await prisma.participare.create({
            data:{
                userrId: trg.id,
                sedintaaId: Number.parseInt(body.id),
                anulat: false,
                prezent: true,
            }
        })
    }else{
        participare = await prisma.participare.update({
            where:{
                id: participare.id
            },
            data:{
                data_ora: new Date(),
                anulat: false,
                prezent: true,
            }
        })
    }
    
    res.status(200).json({
        nume: trg.nume,
    })

}