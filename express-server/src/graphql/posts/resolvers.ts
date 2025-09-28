import { GraphQLError } from "graphql";
import PostService, {
  type PostPayload,
  type UpdatePostPayload,
} from "../../services/postService.js";
import LikeService from "../../services/likeService.js";
import CommentService, { type CommentPayload } from "../../services/commentService.js";
import { requireAuth } from "../authMiddleware.js";

const queries = {
  getAllPosts: async () => {
    return await PostService.getAllPosts();
  },

  getPostById: async (_: any, { id }: { id: string }) => {
    return await PostService.getPostById(id);
  },

  getPostsByUserId: async (_: any, { userId }: { userId: string }) => {
    return await PostService.getPostsByUserId(userId);
  },

  getMyPosts: async (_: any, __: any, context: any) => {
    requireAuth(context.user);
    return await PostService.getPostsByUserId(context.user.id);
  },

  getPostLikes: async (_: any, { postId }: { postId: string }) => {
    return await LikeService.getPostLikes(postId);
  },

  getPostComments: async (_: any, { postId }: { postId: string }) => {
    return await CommentService.getPostComments(postId);
  },
};

const mutations = {
  createPost: async (
    _: any,
    {
      content,
      postImageFile,
    }: { content: string; postImageFile?: Promise<any> | null },
    context: any
  ) => {
    requireAuth(context.user);

    const payload: PostPayload = {
      content,
      postImageFile: postImageFile ?? null,
      userId: context.user.id,
    };

    return await PostService.createPost(payload);
  },

  updatePost: async (
    _: any,
    {
      id,
      content,
      postImageFile,
    }: { id: string; content?: string; postImageFile?: Promise<any> | null },
    context: any
  ) => {
    requireAuth(context.user);

    const payload: UpdatePostPayload = {
      id,
      ...(content !== undefined && { content }), // Only include if defined
      postImageFile: postImageFile ?? null,
      userId: context.user.id,
    };

    return await PostService.updatePost(payload);
  },

  deletePost: async (_: any, { id }: { id: string }, context: any) => {
    requireAuth(context.user);
    return await PostService.deletePost(id, context.user.id);
  },

  toggleLike: async (_: any, { postId }: { postId: string }, context: any) => {
    requireAuth(context.user);
    return await LikeService.toggleLike(postId, context.user.id);
  },

  createComment: async (
    _: any,
    { postId, content }: { postId: string; content: string },
    context: any
  ) => {
    requireAuth(context.user);

    const payload: CommentPayload = {
      postId,
      content,
      userId: context.user.id,
    };

    return await CommentService.createComment(payload);
  },

  deleteComment: async (_: any, { id }: { id: string }, context: any) => {
    requireAuth(context.user);
    return await CommentService.deleteComment(id, context.user.id);
  },
};

// Field resolvers for computed fields
// const fieldResolvers = {
//   Post: {
//     likesCount: (post: any) => post._count?.likes || 0,
//     commentsCount: (post: any) => post._count?.comments || 0,
//   }
// };

export const resolvers = { queries, mutations };
