import { error } from "node:console";
import { prisma } from "../lib/db.js";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";

export interface UserPayloadType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

class UserService {
  //get user by unqiue email
  private static getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  //register
  public static async createUser(payload: UserPayloadType) {
    try {
      const { firstName, lastName, email, password } = payload;

      //fields are missing
      if (!firstName || !lastName || !email || !password) {
        console.log("Fields are missing");
        throw new GraphQLError(
          "Some fields are missing please fill all fields.",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              http: { status: 400 },
            },
          }
        );
      }

      //user already present
      const user = await this.getUserByEmail(email);
      if (user) {
        throw new GraphQLError("User already registered.", {
          extensions: {
            code: "VALIDATION_FAILED",
            http: { status: 400 },
          },
        });
      }

      //hash password
      const hashedPassword: string = await argon2.hash(password);

      //create user
      return prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new GraphQLError(`Error in server ${error}`, {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
          http: { status: 500 },
        },
      });
    }
  }

  //login user
  public static async getUserToken(payload: LoginUserPayload) {
    try {
      const { email, password } = payload;

      //fields check
      if (!email || !password) {
        console.log("fields are missing");
        throw new GraphQLError(
          "Some fields are missing please fill all fields.",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              http: { status: 400 },
            },
          }
        );
      }

      //if user is not registered
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new GraphQLError("User not found.", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      } //  user is a promise here and not object proomises cannot be resolved right waay it shoukd use await and wait to resolve could be null also

      //matched password
      if (await argon2.verify(user.password, password)) {
        //login user
        //generate jwt token
        const token = jwt.sign(
          { email: user.email, id: user.id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "90d",
          }
        );
        return { token, user };
      } else {
        //password do not match
        throw new GraphQLError("Password is incorrect please try again.", {
          extensions: {
            code: "FORBIDDEN",
          },
        });
      }
    } catch (error) {
      throw new GraphQLError(`Error in server ${error}`, {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
          http: { status: 500 },
        },
      });
    }
  }

  public static decodejwtToken(token: string) {
    try {
      if (token) {
        return jwt.verify(token, process.env.JWT_SECRET as string);
      }
      return null;
    } catch (err) {
      return null;
    }
  }
}

export default UserService;
