export const mutations = `#graphql
    createPost(
        content: String!
        postImageFile: Upload
    ): Post

    updatePost(
        id: ID!
        content: String
        postImageFile: Upload
    ): Post
    
    deletePost(id: ID!): Boolean

    toggleLike(postId: ID!): LikeResponse

    createComment(
        postId: ID!
        content: String!
    ): Comment

    deleteComment(id: ID!): Boolean
`;