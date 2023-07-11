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
