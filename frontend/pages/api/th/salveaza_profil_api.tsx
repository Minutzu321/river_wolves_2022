import DBClient from '../../../libs/prismadb'

function cfl(string) {
  let q = "";
  for(let n of string.split(" ")){
    let r = n.charAt(0).toUpperCase() + n.slice(1);
    q += r+" ";
  }
  return q.trim();
}

export default async (req, res) => {
  
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Numai metode POST' })
    return
  }

  const body = JSON.parse(req.body);

  const prisma = DBClient.instance;

  const c = body.c
  

  if(!!c){
    const nr = await prisma.jucator.count({
        where: {
          nume: cfl(body.nume.trim()),
        }
    });
    
    if(nr === 0){
      await prisma.jucator.update({
          where: {
            sid: c
          },
          data:{
              nume: cfl(body.nume.trim()),
              telefon: body.tel.trim(),
            }
      });
      res.status(200).json({succes: true})
    }else{
      res.status(200).json({succes: false})
    }
    
  }else{
    res.status(401)
  }
  res.end()
}