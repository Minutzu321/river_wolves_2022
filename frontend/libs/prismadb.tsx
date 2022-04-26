import { PrismaClient } from '@prisma/client';

import { createPrismaRedisCache } from "prisma-redis-middleware";
import Redis from "ioredis";


const DBClient = {
  instance: new PrismaClient(),
  // redis: new Redis({
  //   host: process.env.REDIS_HOST,
  //   port: 18462,
  //   password: process.env.REDIS_PASS
  // }),
};

export type IDBClient = typeof DBClient;

Object.freeze(DBClient);

// DBClient.instance.$use(
//   createPrismaRedisCache({
//     models: [
//       {model: "User", cacheTime: 12000},
//       {model: "Indiciu", cacheTime: 6000},
//       {model: "Etaj", cacheTime: 6000},
//       {model: "Jucator", cacheTime: 6000},
//     ],
//     storage: { type: "redis", options: { client: DBClient.redis, invalidation: { referencesTTL: 300 }} },
//     cacheTime: 600,
//   }),
// );

export default DBClient;