import { ApolloServer } from "apollo-server";
import dataSource from "./utils";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";

const start = async (): Promise<void> => {
    await dataSource.initialize();
  
    const typeGraphQLgeneratedSchema = await buildSchema({
      resolvers: [UserResolver],
    });
  
    const server = new ApolloServer({ schema: typeGraphQLgeneratedSchema });
  
    const { url } = await server.listen();
    console.log(`Server ready at ${url}`);
  };
  
  void start();