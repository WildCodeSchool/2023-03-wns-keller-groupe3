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

export const GET_ONE_CITY = gql`
  query Query($id: String!) {
    getCityBy(id: $id) {
      id
      name
      latitude
      longitude
      pointsOfInterest {
        id
        picture
        description
        address
        name
        latitude
        longitude
        categories {
          id
          name
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;
export const GET_USER = gql`
  {
    query
    getUser {
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
