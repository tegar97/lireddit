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
const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // const post = orm.em.create(Post, { title: "my first post" });
  // await orm.em.persistAndFlush(post);

  // const Posts = await orm.em.find(Post, {});
  // console.log(Posts);
  const app = express();

  const appoloServer = new ApolloServer({
    schema : await buildSchema({
      resolvers: [HelloResolver,PostResolver],
      validate: false
    }),
    context: () => ({em: orm.em})
  })
  appoloServer.applyMiddleware({app})
  app.listen(4000,() => {
    console.log('server started on localhost:4000')
  })
};

main().catch((err) => {
  console.error(err);
});
