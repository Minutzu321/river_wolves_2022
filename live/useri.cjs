const { genId } = require("./utils.cjs");


const getUseri = async function(prisma) {
    return await prisma.user.findMany();
}


class Quiz {
    constructor(live) {
      this.cod = genId(5);
      this.live = live;
    }
  }

module.exports = { getUseri, Quiz }