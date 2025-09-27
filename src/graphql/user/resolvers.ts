import { prismaClient } from "../../lib/db.js";
import type { LoginUserPayload, UserPayloadType } from "../../services/userService.js";
import UserService from "../../services/userService.js";

const queries = {
    getUserToken: async(_:any, payload: LoginUserPayload) => {
    return await UserService.getUserToken(payload)
  }
};

const mutations = {
  createUser: async (_:any, payload: UserPayloadType) => {
       return await UserService.createUser(payload)
  },
};

export const resolvers = { queries, mutations };
