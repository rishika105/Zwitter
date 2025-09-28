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

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!){
        loginUser(email: $email, password: $password){
          token
          user {
            firstName,
            lastName,
            email,
            profileImageURL
          }
        }
    }
`