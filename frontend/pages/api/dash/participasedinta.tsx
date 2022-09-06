import { useAuth } from "../../../libs/autorizare";
import { ADMIN_PERM } from "../../../libs/config";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;

    const body = req.body;

    let participare = await prisma.participare.findFirst({
        where:{
            userId: user.id,
            sedintaaId: body.id,
        },
        
    })

    if(!participare){
        participare = await prisma.participare.create({
            data:{
                userId: user.id,
                sedintaaId: body.id,
                anulat: body.anulat,
                prezent: body.prezent,
            }
        })
    }else{
        participare = await prisma.participare.update({
            where:{
                id: participare.id
            },
            data:{
                data_ora: new Date(),
                anulat: body.anulat,
                prezent: body.prezent,
            }
        })
    }
    
    res.status(200).json({
        participare: participare,
    })

}