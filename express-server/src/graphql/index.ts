import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.js";
import { Post } from "./posts/index.js";
import  {Comment} from './comments/index.js'


// Post can reference Comment
// Comment can reference Post
// Both are registered in the final schema that is here all are merged

export async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `#graphql
                ${User.typeDefs}
                ${Post.typeDefs}
                ${Comment.typeDefs}

                type Query {
                    ${User.queries}
                    ${Post.queries}
                    ${Comment.queries}
                }
                type Mutation {
                    ${User.mutations}
                    ${Post.mutations}
                    ${Comment.mutations}
                }
            `, //Schema

    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
        ...Comment.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations,
        ...Comment.resolvers.mutations
      },
    }, //Function
  });

  await gqlServer.start(); //to use await we need to make a function cant run locally

  return gqlServer;
}
