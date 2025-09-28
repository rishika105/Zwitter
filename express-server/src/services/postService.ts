import { GraphQLError } from "graphql";
import { prisma } from "../lib/db.js";

export interface PostPayload {
  content: string;
  postImageURL?: string | null; // Make optional
  userId: string; // Add userId to associate post with user
}

class PostService {
  //create post
  public static async createPost(payload: PostPayload) {
    try {
      const { content, postImageURL, userId } = payload;

      //fields are missing
      if (!content || !userId) {
        throw new GraphQLError("Content and user authentication required", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }

      //create post
      return prisma.post.create({
        data: {
          content,
          postImageURL: postImageURL ?? null, // ✅ explicitly convert undefined to null,
          userId, // Associate with user
        },
        include: {
          user: true, // Include user in response
        },
      });
    } catch (error) {
      throw new GraphQLError(`Error in server ${error}`, {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
          http: { status: 500 },
        },
      });
    }
  }
}

export default PostService;
