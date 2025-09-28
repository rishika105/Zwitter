import { GraphQLError } from "graphql";
import PostService, { type PostPayload } from "../../services/postService.js";
import { requireAuth } from "../authMiddleware.js";


// All of our resolvers can access our shared contextValue in the third positional parameter!
const queries = {};

//user from context
const mutations = {
  createPost: async (
    _: any,
    { content, postImageURL }: { content: string; postImageURL?: string | null },
    context: any
  ) => {
    requireAuth(context.user);

    const payload: PostPayload = {
      content,
      postImageURL: postImageURL ?? null,
      userId: context.user.id, // Get user ID from context
    };

    return await PostService.createPost(payload);
  },
};

export const resolvers = { queries, mutations };
