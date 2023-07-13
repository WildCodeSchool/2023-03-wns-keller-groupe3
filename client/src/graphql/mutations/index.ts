import { gql } from "@apollo/client";

export const ADD_CITY = gql`
  mutation Mutation(
    $longitude: Float
    $latitude: Float
    $picture: String!
    $name: String!
  ) {
    createCity(
      longitude: $longitude
      latitude: $latitude
      picture: $picture
      name: $name
    ) {
      id
      name
      picture
      latitude
      longitude
    }
  }
`;


export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;
