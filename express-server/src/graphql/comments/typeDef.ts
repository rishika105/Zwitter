export const typeDefs = `#graphql
type Comment {
  id: ID!
  content: String!
  createdAt: String!
  user: User!
  post: Post!
}

`;
