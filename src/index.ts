import express from "express"

import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { prismaClient } from "./lib/db.js";

async function init() {
    const app = express();

    const PORT = Number(process.env.PORT) || 7000;

    app.use(express.json())

    //create graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
            type Mutation {
                createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
            }
        `, //Schema
        resolvers: {
            Query: {
                hello: () => `hey there i am graphql resolver func`,
                say: (_, {name}: {name: string} )=> `Hey ${name} How are you?`
            },
            Mutation: {
                createUser: async(_, {firstName, lastName, email, password}: {firstName: string; lastName: string; email: string; password: string}) => {
                    await prismaClient.user.create({
                            data: {
                            email, 
                            firstName,
                            lastName,
                            password,
                            salt: "random_salt",
                        },
                })
                return true
            },
            }
        }  //Function
    })

    await gqlServer.start(); //to use await we need to make a function cant run locally


    app.get('/', (req, res) => {
        res.json({message: "Server is up and running"})
    });

    app.use("/graphql", expressMiddleware(gqlServer))

    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))
}

init();