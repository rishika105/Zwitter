export const typeDefs = `#graphql
  type Post {
    id: ID!
    content: String!
    postImageURL: String
    user: User!
    likes: [User!]
    comments: [Comment!]
  }
`;
