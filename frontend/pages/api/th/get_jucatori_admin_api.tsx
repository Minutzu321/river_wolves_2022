import DBClient from '../../../libs/prismadb'
import autorizeaza from '../../../libs/autorizare'

var gMuzeu = function(xs) {
  return xs.reduce(function(rv, x) {
    (rv[x.indiciu.etaj["muzeu"]] = rv[x.indiciu.etaj["muzeu"]] || []).push(x);
    return rv;
  }, {});
};

var gEtaj = function(xs) {
  return xs.reduce(function(rv, x) {
    (rv[x.indiciu.etaj["etaj"]] = rv[x.indiciu.etaj["etaj"]] || []).push(x);
    return rv;
  }, {});
};

var gNume = function(xs) {
  return xs.reduce(function(rv, x) {
    (rv[x.jucator["nume"]] = rv[x.jucator["nume"]] || []).push(x);
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
  
  const prisma = DBClient.instance

  const indicii = await prisma.indiciuMeta.findMany({
    include: {
        jucator: true,
        indiciu: {
          include:{
            etaj: true,
          }
        },
    },
  });
  const MUZEE = ["AVRAMIDE","ARTA","ACVARIU","ISTORIE"]
  const gnume = gNume(indicii);
  
  
  let c = 0;
  let FIN = [];
  for(let nume of Object.keys(gnume)){
    if(!nume || nume === "null"){
      continue;
    }
    console.log(gnume[nume][0].jucator.creator, gnume[nume][0].jucator.telefon);
    
    let C_NUME = [];
    const gmuzee = gMuzeu(gnume[nume]);
    for(let muzeu of MUZEE){
      let C_MUZEU = [];
      if(!!gmuzee[muzeu]){
          let et = gEtaj(gmuzee[muzeu])
          for(let etaj of Object.keys(et)){
              let C_ETAJ = [];
              let numar_indicii_total = et[etaj].length;
              for(let i=0;i<numar_indicii_total;i++){
                  let indiciu = et[etaj][i].indiciu;
                  C_ETAJ.push({
                    id: c,
                    s: et[etaj][i].rezolvat?1:et[etaj][i].sarit?2:3,
                    name: indiciu.intrebare,
                    children: [
                      {
                        id: (c+1),
                        s: et[etaj][i].rezolvat?1:et[etaj][i].sarit?2:3,
                        name: indiciu.raspuns,
                      },
                    ],
                  });
                  c+=2;
              }
              C_MUZEU.push({
                id: c,
                name: etaj,
                children: C_ETAJ,
              });
              c++;
          }
      }
      C_NUME.push({
        id: c,
        name: muzeu,
        children: C_MUZEU,
      });
      c++;
    }
    FIN.push({
        id: 'root',
        name: nume, 
        creator: gnume[nume][0].jucator.creator,
        telefon: gnume[nume][0].jucator.telefon,
        children: C_NUME
    })
  }

  res.status(200).json({jucatori: FIN})
  
  
  res.end()
}