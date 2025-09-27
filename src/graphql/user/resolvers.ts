import { prismaClient } from "../../lib/db.js";

const queries = {
  hello: () => "hey there i am graphql resolver func",
  say: (_:any, { name }: {name: string}) => `Hey ${name}, how are you?`
};

const mutations = {
  createUser: async (_:any, { firstName, lastName, email, password }: {firstName: string; lastName: string; email: string; password: string}) => {
    await prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        salt: "random_salt"
      }
    });
    return true;
  }
};

export const resolvers = { queries, mutations };
