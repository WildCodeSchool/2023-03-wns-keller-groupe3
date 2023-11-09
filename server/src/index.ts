import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { CategoryResolver } from "./resolvers/CategoryResolver";
import { CityResolver } from "./resolvers/CityResolver";
import { POIResolver } from "./resolvers/POIResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { Role } from "./entities/User";

import dataSource from "./utils";
import "reflect-metadata";
import * as jwt from "jsonwebtoken";

const start = async (): Promise<void> => {
  await dataSource.initialize();

  const typeGraphQLgeneratedSchema = await buildSchema({
    resolvers: [CategoryResolver, CityResolver, POIResolver, UserResolver],
    authChecker: ({ context },  authorizedRoles: Role[]) => {
      console.log("roles is", authorizedRoles);
      console.log("context from authchecker", context);
      if (authorizedRoles.includes(context.role) || authorizedRoles.length === 0 ) {
        return true;
      } else {
        return false;
      }
    },
  });

  const server = new ApolloServer({
    schema: typeGraphQLgeneratedSchema,
    context: ({ req }) => {
      console.log("request of context : ", req.headers.authorization)
      if (
        req.headers.authorization !== undefined &&
        req.headers.authorization !== ""
      ) {
        const payload = jwt.verify(
          req.headers.authorization.split(" ")[1],
          process.env.JWT_SECRET_KEY as jwt.Secret
        );
        console.log("payload is :", payload)
        return payload;
      }
      return {};
    },
  });

  const { url } = await server.listen();
  console.log(`Server ready at ${url}`);
};

void start();
