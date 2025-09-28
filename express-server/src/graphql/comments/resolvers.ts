import type {
  LoginUserPayload,
  UserPayloadType,
} from "../../services/userService.js";
import UserService from "../../services/userService.js";

  // All of our resolvers can access our shared contextValue in the third positional parameter!
const queries = {
  getCurrentLoggedInUser: async(_:any, parameters:any, context:any) => {
      // console.log(context)
  }
};

const mutations = {
  createUser: async (_: any, payload: UserPayloadType) => {
    return await UserService.createUser(payload);
  },
  loginUser: async (_: any, payload: LoginUserPayload) => {
    return await UserService.getUserToken(payload);
  },
};

export const resolvers = { queries, mutations };
