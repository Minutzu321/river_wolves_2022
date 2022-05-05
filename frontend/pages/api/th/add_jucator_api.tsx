import DBClient from '../../../libs/prismadb'
import autorizeaza from '../../../libs/autorizare'
import { Prisma } from '@prisma/client';

var gMuzeu = function(xs) {
  return xs.reduce(function(rv, x) {
    (rv[x.etaj["muzeu"]] = rv[x.etaj["muzeu"]] || []).push(x);
    return rv;
  }, {});
};

var gEtaj = function(xs) {
  return xs.reduce(function(rv, x) {
    (rv[x.etaj["id"]] = rv[x.etaj["id"]] || []).push(x);
    return rv;
  }, {});
};

export default async (req, res) => {
  
  const sesiune = await autorizeaza(req, res);
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    return
  }
  if (!sesiune) return

  const body = JSON.parse(req.body)
  
  const prisma = DBClient.instance

  let valori = {
    AVRAMIDE: body.muzeu==="AVRAMIDE",
    ACVARIU: body.muzeu==="ACVARIU",
    ARTA: body.muzeu==="ARTA",
    ISTORIE: body.muzeu==="ISTORIE",
  } as Prisma.JsonObject
  

  const jucator = await prisma.jucator.create({
    data:{
        creator: sesiune.user.email,
        start: body.muzeu,
        muzee: valori,
      }
  });

  const indicii = await prisma.indiciu.findMany({
    select: {
        id: true,
        etaj: true,
    },
  });
  const MUZEE = ["AVRAMIDE","ARTA","ACVARIU","ISTORIE"]
  const gmuzee = gMuzeu(indicii);
  let INDICII_FINALE = [];

  //14 mai
  //donatie minima: 5 lei
  //toate donatiile vor fi trimise catre UNICEF

  for(let muzeu of MUZEE){
    if(!!gmuzee[muzeu]){
        let et = gEtaj(gmuzee[muzeu])
        for(let etaj of Object.keys(et)){
          if(muzeu === "AVRAMIDE" && etaj === "PARTER"){
            let d = new Date();
            if(d.getHours() < 19 || (d.getHours() == 19 && d.getMinutes() < 45)){
              continue;
            }
          }
            let numar_indicii_total = et[etaj].length;
            let indicii_pe_etaj = (Math.floor(numar_indicii_total/10))+Math.min(3,numar_indicii_total);
            let pas = Math.ceil(numar_indicii_total / indicii_pe_etaj);
            let incepe = jucator.id%pas;
            for(let i=incepe;i<numar_indicii_total;i+=pas){
                INDICII_FINALE.push({jucatorId: jucator.id, indiciuId: et[etaj][i].id})
            }
        }
    }
  }

  await prisma.indiciuMeta.createMany({
    data: INDICII_FINALE,
    skipDuplicates: true,
  })


  

  res.status(200).json({sid: jucator.sid})
  
  
  res.end()
}