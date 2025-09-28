import { GraphQLError } from "graphql";
import { prisma } from "../lib/db.js";

export interface CommentPayload {
  content: string;
  postId: string;
  userId: string;
}

class CommentService {
  // Create comment
  public static async createComment(payload: CommentPayload) {
    const { content, postId, userId } = payload;

    if (!content) {
      throw new GraphQLError("Comment content is required");
    }

    return await prisma.comment.create({
      data: { content, postId, userId },
      include: {
        user: {
          select: { id: true, firstName: true, email: true }
        }
      }
    });
  }

  // Get comments for a post
  public static async getPostComments(postId: string) {
    return await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: { id: true, firstName: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Delete comment
  public static async deleteComment(id: string, userId: string) {
    const comment = await prisma.comment.findUnique({
      where: { id }
    });

    if (!comment) {
      throw new GraphQLError("Comment not found");
    }

    if (comment.userId !== userId) {
      throw new GraphQLError("Not authorized to delete this comment");
    }

    await prisma.comment.delete({
      where: { id }
    });

    return true;
  }
}

export default CommentService;
