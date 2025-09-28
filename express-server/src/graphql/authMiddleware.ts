import { GraphQLError } from "graphql";

interface UserTypeMiddleware {
  id: string;
  email: string;
}

export function requireAuth(user: UserTypeMiddleware | null) {
  if (!user || !user.id) {
    throw new GraphQLError(`Not authenticated or authorized`, {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
}