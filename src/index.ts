import 'reflect-metadata'
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import {HelloResolver} from './resolvers/helo'
import {PostResolver} from './resolvers/post'
import {UserResolver} from './resolvers/User'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { MyContext } from './types';



const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // const post = orm.em.create(Post, { title: "my first post" });
  // await orm.em.persistAndFlush(post);
  
  // const Posts = await orm.em.find(Post, {});
  // console.log(Posts);
  const app = express();
  
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()
  
  
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
          client : redisClient,
          disableTouch: true,
         }),
      cookie :{
        maxAge: 1000 * 60 * 60 * 24 ,//1days
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax' // csrf
      },
      saveUninitialized: false,
      secret: 'teteatsdsadasdfasfas',
      resave: false
    })
  )
  const appoloServer = new ApolloServer({
    schema : await buildSchema({
      resolvers: [HelloResolver,PostResolver,UserResolver],
      validate: false
    }),
    context: ({req,res}) : MyContext => ({em: orm.em,req,res})
  })
  appoloServer.applyMiddleware({app})
  app.listen(4000,() => {
    console.log('server started on localhost:4000')
  })
};

main().catch((err) => {
  console.error(err);
});
