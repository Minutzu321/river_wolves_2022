import DBClient from '../../../libs/prismadb'
import stringSimilarity from 'string-similarity'

function normalizeaza(str){
    return str.trim().toLowerCase().normalize('NFKD').replace(/[^\w]/g, '');
}

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Numai metode POST' })
        return
    }

  const body = JSON.parse(req.body);
  const raspunsUser = normalizeaza(body.raspuns);

  const prisma = DBClient.instance;
  const dbRasp = await prisma.indiciuMeta.findFirst({
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
                    raspuns: true,
                }
            },
        },
    });

    const raspunsReal = normalizeaza(dbRasp.indiciu.raspuns);

    let corect = false;

    if(raspunsReal === raspunsUser || stringSimilarity.compareTwoStrings(raspunsReal, raspunsUser) >= 0.9){
        corect = true;
        await prisma.indiciuMeta.update({
            where:{
                id: dbRasp.id,
            },
            data:{
                rezolvat: true,
                timpRezolvat: new Date(),
            }
        })
    }

    const fin = {
        aproape: stringSimilarity.compareTwoStrings(raspunsReal, raspunsUser) >= 0.6,
        corect: corect,
    };
    res.status(200).json(fin);
  

  res.end();

  
  
}