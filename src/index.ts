import express from "express"

import dotenv from "dotenv";
dotenv.config();

import { expressMiddleware } from "@as-integrations/express5";
import { createApolloGraphqlServer } from "./graphql/index.js";

async function init() {
    
    const app = express();
    const PORT = Number(process.env.PORT) || 7000;

    app.use(express.json())

    app.get('/', (req, res) => {
        res.json({message: "Server is up and running"})
    });

    //create graphql server
    const gqlserver = await createApolloGraphqlServer();
   

    app.use("/graphql", expressMiddleware(gqlserver))

    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))
}

init();