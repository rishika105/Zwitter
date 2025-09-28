import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { expressMiddleware } from "@as-integrations/express5";
import { createApolloGraphqlServer } from "./graphql/index.js";
import UserService from "./services/userService.js";
import { GraphQLError } from "graphql";
import { prisma } from "./lib/db.js";
import cors from "cors";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { cloudinaryConnect } from "./lib/cloudinary.js";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 7000;

  app.use(express.json());
  app.use(cors());
  // Enable file upload parsing
  app.use(graphqlUploadExpress()); // ✅ Important
  cloudinaryConnect();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  //create graphql server
  //before going to the graphql server
  //it will go in the context and whatever returned can be used in all routes
  //like auth middlware for authorization
  // server.ts - improve context handling
  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.replace("Bearer ", "");
        try {
          const user = await UserService.decodejwtToken(token);
          // console.log(user);
          return { user };
        } catch (err) {
          return null;
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();
