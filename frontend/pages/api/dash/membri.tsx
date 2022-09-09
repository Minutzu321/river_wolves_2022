import { useAuth } from "../../../libs/autorizare";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;

    const membri = await prisma.user.findMany({
        where:{
            NOT : {
                email: user.email,
            }
        },
        select:{
            email: true,
            nume: true,
            telefon: true,
            data_nasterii: true,
            poza: true,
            incredere: true,

            grad: true,
            departament: true,

            participari: true,

            primaLogare: true,
        }
    });
    
    res.status(200).json({
        membri: membri,
    })

}