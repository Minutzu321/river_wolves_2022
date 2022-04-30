import DBClient from '../../../libs/prismadb'
import autorizeaza from '../../../libs/autorizare'
import { writeFile } from 'fs';
import { randomUUID } from 'crypto';


export default async (req, res) => {
  
  const sesiune = await autorizeaza(req, res);
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    return
  }
  if (!sesiune) return

  const body = JSON.parse(req.body)

  const pozauid = randomUUID()

  writeFile('public/th/'+pozauid+'.png', body.poza.split(';base64,').pop(), {encoding: 'base64'}, function(err) {
    console.log('Poza '+pozauid+' a fost adaugata!');
});
  
  const prisma = DBClient.instance

  await prisma.indiciu.create({
    data:{
        creator: sesiune.user.email,
        intrebare: body.intrebare,
        raspuns: body.raspuns,
        poza: "/th/"+pozauid+".png",
        lat: body.locatie.lat.toString(),
        lng: body.locatie.lng.toString(),
        acc: body.locatie.acc.toString(),
        arataPoza: body.arataPoza,
        arataForma: body.arataForma,
        etajID: body.etajID,
      }
  })
  

  res.status(200).json({succes: true})
  
  
  res.end()
}