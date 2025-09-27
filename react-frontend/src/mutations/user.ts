import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName,  email: $email, password: $password) {
        firstName,
        lastName,
        email
    }
  }
`;

export const GET_USER_TOKEN_QUERY = gql`
    query Login($email: String!, $password: String!){
        getUserToken(email: $email, password: $password)
    }
`