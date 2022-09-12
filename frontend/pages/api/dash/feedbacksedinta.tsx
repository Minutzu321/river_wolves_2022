import { useAuth } from "../../../libs/autorizare";
import { VOLUNTAR_PERM } from "../../../libs/config";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user) return;
    if(perm < VOLUNTAR_PERM){
      res.status(401).json({
          err: "Neautorizat",
      })
      return;
    }

    console.log(req.body['1']);
    

    const sedinte = await prisma.feedbackSedinta.create({
      data:{
        fAscult: req.body['0'],
        fMuncit: req.body['1'],
        fSimt: req.body['2'],
        fInvat: req.body['3'],
        fAltele: req.body['4'],
        userIdd: user.id,
      }
    })
    
    res.status(200).json({
        rasp: true,
    })

}