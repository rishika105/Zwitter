import { v2 as cloudinary } from "cloudinary";

export function cloudinaryConnect(): void {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME as string,
      api_key: process.env.CLOUD_API_KEY as string,
      api_secret: process.env.CLOUD_API_SECRET as string,
    });
    console.log("✅ Cloudinary connected successfully");
  } catch (error) {
    console.error("❌ Cloudinary connection failed", error);
  }
}

export default cloudinary; // optional, if you want to use it elsewhere
