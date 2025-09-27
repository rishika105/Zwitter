import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.js";

export async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `#graphql
                ${User.typeDefs}

                type Query {
                    ${User.queries}
                }
                type Mutation {
                    ${User.mutations}
                }
            `, //Schema

    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    }, //Function
  });

  await gqlServer.start(); //to use await we need to make a function cant run locally

  return gqlServer;
}
