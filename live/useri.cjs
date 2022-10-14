const { genId } = require("./utils.cjs");


const getUseri = async function(prisma) {
    return await prisma.user.findMany();
}

const getUserByAuthId = async function(prisma, authId) {
  return await prisma.user.findFirst({
    where:{
      sauth: path,
    }
  })
}



class RWUser {
  constructor(user) {
    this.nume = user.nume;
    this.email = user.email;
  }
}

class RWQuiz {
  constructor(cod, quiz) {
    this.cod = cod;
    this.intrebari = genIntrebari();
  }

  get genIntrebari() {
    return []
  }
}

module.exports = { getUseri, RWUser }