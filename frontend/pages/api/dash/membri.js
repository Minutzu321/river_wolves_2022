import { useAuth } from "../../../libs/autorizare";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;

    const membri = await prisma.user.findMany({
        where:{
            NOT : {
                email: user.email,
            }
        }
    });
    
    console.log(membri);
    

}