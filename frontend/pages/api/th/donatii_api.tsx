import DBClient from '../../../libs/prismadb'

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Numai metode POST' })
        return
    }

  const prisma = DBClient.instance;
  const jucatori = await prisma.jucator.count();
  
  res.status(200).json({donatii: (jucatori*5)});
  

  res.end();

  
  
}