import DBClient from '../../../libs/prismadb'

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Numai metode POST' })
        return
    }

  const body = JSON.parse(req.body);

  console.log(body);
  
  const prisma = DBClient.instance;
  await prisma.indiciuMeta.update({
      where: {
          id: body.id,
      },
      data:{
        sarit: true,
      }
  });
  
    res.status(200).json({succes: true});
  

  res.end();

  
  
}