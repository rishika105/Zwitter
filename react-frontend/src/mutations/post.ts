import { gql } from "@apollo/client";

export const POST_MUTATION = gql`
  mutation CreatePost($content: String!, $postImageFile: Upload) {
    createPost(content: $content, postImageFile: $postImageFile) {
      id
      content
      postImageFile
      user {
        firstName
      }
    }
  }
`;
