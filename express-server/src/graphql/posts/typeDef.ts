export const typeDefs = `#graphql
  scalar Upload

  type Post {
    id: ID!
    content: String!
    postImageFile: String
    createdAt: String!
    user: User!
    likes: [Like!]!
    comments: [Comment!]!
    likesCount: Int!
    commentsCount: Int!
  }

  type Like {
    id: ID!
    userId: String!
    postId: String!
    user: User!
  }

  type Comment {
    id: ID!
    content: String!
    userId: String!
    postId: String!
    createdAt: String!
    user: User!
  }

  type LikeResponse {
    liked: Boolean!
    message: String!
  }
`;