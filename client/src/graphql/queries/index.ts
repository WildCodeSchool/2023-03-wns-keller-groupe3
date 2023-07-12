import { gql } from "@apollo/client";

export const GET_CITIES = gql`
  query Query {
    getAllCities {
      id
      name
      picture
    }
  }
`;

export const GET_USER = gql` {
  query getUser {
    id
    name
    mail
  }
}
`;


export const LOGIN = gql`
  query Query($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;
