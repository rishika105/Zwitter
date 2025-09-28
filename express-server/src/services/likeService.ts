// 📁 services/likeService.ts (NEW)
import { GraphQLError } from "graphql";
import { prisma } from "../lib/db.js";

class LikeService {
  // Toggle like (like/unlike)
  public static async toggleLike(postId: string, userId: string) {
    const existingLike = await prisma.like.findFirst({
      where: { postId, userId }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      return { liked: false, message: "Post unliked" };
    } else {
      // Like
      await prisma.like.create({
        data: { postId, userId }
      });
      return { liked: true, message: "Post liked" };
    }
  }

  // Get likes for a post
  public static async getPostLikes(postId: string) {
    return await prisma.like.findMany({
      where: { postId },
      include: {
        user: {
          select: { id: true, firstName: true, email: true }
        }
      }
    });
  }
}

export default LikeService;
