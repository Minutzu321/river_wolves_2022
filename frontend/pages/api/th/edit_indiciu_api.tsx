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

  const prisma = DBClient.instance

  if(body.poza && body.poza.length > 10){
    writeFile('public/th/'+pozauid+'.png', body.poza.split(';base64,').pop(), {encoding: 'base64'}, function(err) {
        console.log('File created');
      });

    await prisma.indiciu.update({
      where: {
        id: body.id
      },
      data:{
          intrebare: body.intrebare,
          raspuns: body.raspuns,
          poza: "/th/"+pozauid+".png",
          arataPoza: body.arataPoza,
          etajID: body.etajID,
        }
    })
  }else{
    await prisma.indiciu.update({
      where: {
        id: body.id
      },
      data:{
          intrebare: body.intrebare,
          raspuns: body.raspuns,
          arataPoza: body.arataPoza,
          etajID: body.etajID,
        }
    })
  }

  
  

  res.status(200).json({succes: true})
  
  
  res.end()
}