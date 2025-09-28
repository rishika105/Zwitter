import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.js";
import { Post } from "./posts/index.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";


// Post can reference Comment
// Comment can reference Post
// Both are registered in the final schema that is here all are merged
export async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
      csrfPrevention: true,
    typeDefs: `#graphql
                ${User.typeDefs}
                ${Post.typeDefs}

                type Query {
                    ${User.queries}
                    ${Post.queries}
                }
                type Mutation {
                    ${User.mutations}
                    ${Post.mutations}
                }
            `, //Schema

    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
      },
      Upload: GraphQLUpload,
      Mutation: {
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations,
      },
        // Add field resolvers
      // ...Post.resolvers.Post,
    }, //Function

  });

  await gqlServer.start(); //to use await we need to make a function cant run locally

  return gqlServer;
}
