import DBClient from '../../../libs/prismadb'
import { Prisma } from '@prisma/client';

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Numai metode POST' })
        return
    }

  const body = JSON.parse(req.body);
  const prisma = DBClient.instance;
  const [indiciu, ramase, total] = await prisma.$transaction([prisma.indiciuMeta.findFirst({
      where: {
          jucatorId: body.user.id,
          rezolvat: false,
          sarit: false,
          indiciu: {
              etaj: {
                  muzeu: body.user.start
              }
          }
      },
      select:{
        id: true,
        timp: true,
        indiciu:{
            select: {
                intrebare: true,
                arataPoza: true,
                arataForma: true,
                raspuns: true,
                poza: true,
                etaj: true,
            }
        },
        jucator:{
          select:{
            muzee: true,
          }
        }
      },
  }),
  prisma.indiciuMeta.count({
        where: {
            jucatorId: body.user.id,
            rezolvat: false,
            sarit: false,
        },
  }),
  prisma.indiciuMeta.count({
    where: {
        jucatorId: body.user.id,
    },
  }),
  ])

  if(!!indiciu && !indiciu.timp){
    await prisma.indiciuMeta.update({
      where:{
          id: indiciu.id,
      },
      data:{
          timp: new Date(),
      }
    })
  }

  if(!!indiciu){
    const fin = {
        id: indiciu.id,
        indiciu: indiciu.indiciu.intrebare,
        arataPoza: indiciu.indiciu.arataPoza,
        poza: indiciu.indiciu.arataPoza?indiciu.indiciu.poza:"",
        forma: indiciu.indiciu.arataForma?indiciu.indiciu.raspuns.replace(/[^-,\s/_.]/g, '*'):false,
        ramase: ramase,
        total: total,
        next: false,
        etaj: indiciu.indiciu.etaj.etaj,
        terminat: false
    };
    res.status(200).json(fin);
  }else if(ramase!==0){
    const fin = {next: true, terminat: false};
    let muze = body.user.muzee as Prisma.JsonObject;
    muze[body.user.start] = true;
    await prisma.jucator.update({
      where:{
        id: body.user.id,
      },
      data:{
        muzee: muze
      }
    })
    
    res.status(200).json(fin);
  }else{
    const fin = {next: false, terminat: true};
    res.status(200).json(fin);
  }

  res.end();

  
  
}