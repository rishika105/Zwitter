import { GraphQLError } from "graphql";
import { prisma } from "../lib/db.js";
import cloudinary from "../lib/cloudinary.js";
import type { FileUpload } from "graphql-upload/processRequest.mjs";

export interface PostPayload {
  content: string;
  postImageFile?: Promise<FileUpload> | null;
  userId: string;
}

export interface UpdatePostPayload {
  id: string;
  content?: string;
  postImageFile?: Promise<FileUpload> | null;
  userId: string;
}

class PostService {
  // Create post
  public static async createPost(payload: PostPayload) {
    const { content, userId, postImageFile } = payload;

    if (!content || !userId) {
      throw new GraphQLError("Content and user authentication required");
    }

    let finalImageURL: string | null = null;

    if (postImageFile) {
      const file = await postImageFile;
      finalImageURL = await this.uploadToCloudinary(file);
    }

    return await prisma.post.create({
      data: {
        content,
        postImageFile: finalImageURL,
        userId,
      },
      include: {
        user: {
          select: { id: true, email: true, firstName: true }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      },
    });
  }

  // Get all posts
  public static async getAllPosts() {
    return await prisma.post.findMany({
      include: {
        user: {
          select: { id: true, email: true, firstName: true }
        },
        likes: {
          include: {
            user: { select: { id: true, firstName: true } }
          }
        },
        comments: {
          include: {
            user: { select: { id: true, firstName: true } }
          },
          orderBy: { id: 'desc' }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // Get post by ID
  public static async getPostById(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, firstName: true }
        },
        likes: {
          include: {
            user: { select: { id: true, firstName: true } }
          }
        },
        comments: {
          include: {
            user: { select: { id: true, firstName: true } }
          },
          orderBy: { id: 'desc' }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      },
    });

    if (!post) {
      throw new GraphQLError("Post not found");
    }

    return post;
  }

  // Get posts by user ID
  public static async getPostsByUserId(userId: string) {
    return await prisma.post.findMany({
      where: { userId },
      include: {
        user: {
          select: { id: true, email: true, firstName: true }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // Update post
  public static async updatePost(payload: UpdatePostPayload) {
    const { id, content, postImageFile, userId } = payload;

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new GraphQLError("Post not found");
    }

    if (existingPost.userId !== userId) {
      throw new GraphQLError("Not authorized to update this post");
    }

    let finalImageURL = existingPost.postImageFile;

    if (postImageFile) {
      const file = await postImageFile;
      finalImageURL = await this.uploadToCloudinary(file);
    }

    return await prisma.post.update({
      where: { id },
      data: {
        ...(content && { content }),
        ...(postImageFile !== undefined && { postImageFile: finalImageURL }),
      },
      include: {
        user: {
          select: { id: true, email: true, firstName: true }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      },
    });
  }

  // Delete post
  public static async deletePost(id: string, userId: string) {
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new GraphQLError("Post not found");
    }

    if (existingPost.userId !== userId) {
      throw new GraphQLError("Not authorized to delete this post");
    }

    if (existingPost.postImageFile) {
      await this.deleteFromCloudinary(existingPost.postImageFile);
    }

    await prisma.post.delete({
      where: { id },
    });

    return true;
  }

  // Cloudinary upload helper
  private static async uploadToCloudinary(file: FileUpload): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: process.env.FOLDER_NAME as string },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("No result from Cloudinary"));
          resolve(result.secure_url);
        }
      );

      file.createReadStream().pipe(uploadStream);
    });
  }

  // Cloudinary delete helper
  public static async deleteFromCloudinary(imageURL: string): Promise<void> {
    try {
      const publicId = imageURL.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
    }
  }
}

export default PostService;