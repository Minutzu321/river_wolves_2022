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

module.exports = { getUseri, RWUser }