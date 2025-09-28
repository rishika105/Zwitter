export const mutations = `#graphql
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User

    loginUser(
      email: String!
      password: String!
    ): LoginObj
`;
