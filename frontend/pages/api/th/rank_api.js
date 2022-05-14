import DBClient from '../../../libs/prismadb'
import autorizeaza from '../../../libs/autorizare'


export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    return
  }
  
  const prisma = DBClient.instance

  let jucatori = await prisma.jucator.findMany({
      include:{
          indicii: true
      }
  });

  

  var compara = function(a,b){
    if(a.ir < b.ir){
        return 1;
    }
    if(a.ir > b.ir){
        return -1;
    }
    if(a.v < b.v && a.v != 0){
        return -1;
    }
    if(a.v > b.v || a.v == 0){
        return 1;
    }
    return 0;
}

  let jmod = []
  for(let juc of jucatori){
    if(!juc.nume){
      continue;
    }
    let suma = 0;
    let rez = 0;
    for(let indiciu of juc.indicii){
        if(!!indiciu.timpRezolvat && !!indiciu.timp){
            suma += Math.abs(indiciu.timpRezolvat.getTime() - indiciu.timp.getTime());
            if(indiciu.rezolvat){
                rez++;
            }
        }
    }

    let medie = suma/juc.indicii.length;
    let proc = parseInt((rez/juc.indicii.length)*100);
    medie = medie || 0
    proc = proc || 0
    jmod.push({nume: juc.nume, ir: proc, v: medie})
  }

  let s = jmod.sort(compara);

  let fin = []

  for(let i = 1; i<=s.length; i++){
    let t = s[i-1];
    fin.push({id: i, nume: t.nume, ir: t.ir, v: t.v})
  }

  res.status(200).json(fin)
  
  
  res.end()
}