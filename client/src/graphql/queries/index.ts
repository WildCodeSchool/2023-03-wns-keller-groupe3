import { gql } from "@apollo/client";

export const GET_CITIES = gql`
  query Query($limit: Int!, $offset: Int!) {
    getAllCities(limit: $limit, offset: $offset) {
      id
      name
      picture
    }
  }
`;
