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

  const prisma = DBClient.instance

  const jucs = await prisma.jucator.findMany({
    where: {
      start: "AVRAMIDE"
    }
  });

  var item;
  let verif = 0;
  while(!item && jucs.length !== 0 && verif !== jucs.length){
    var tj = jucs[Math.floor(Math.random()*jucs.length)];
    verif++;
    let praji = await prisma.prajitura.count({
      where: {
        jucatorID: tj.id,
      }
    });
    if(praji === 0){
      item = tj;
    }
  }

  if(item){
    await prisma.prajitura.create({
      data:{
          jucatorID: item.id,
          nume: item.nume
        }
    })
    res.status(200).json({succes: true, nume: item.nume})
  }else{
    res.status(200).json({succes: false})
  }
  

  
  
  
  res.end()
}