export const queries = `#graphql
    getAllPosts: [Post]
    getPostById(id: ID!): Post
    getPostsByUserId(userId: ID!): [Post]
    getMyPosts: [Post]
    getPostLikes(postId: ID!): [Like]
    getPostComments(postId: ID!): [Comment]
`;
