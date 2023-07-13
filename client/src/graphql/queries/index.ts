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

export const GET_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;
