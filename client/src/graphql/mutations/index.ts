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

export const ADD_POI = gql`
  mutation AddPOI(
    $address: String!
    $categories: [CategoryInput!]!
    $description: String!
    $gpsPin: String!
    $name: String!
    $picture: String!
    $rating: Float!
    $city: CityInput!
    $latitude: Float!
    $longitude: Float!
  ) {
    createPOI(
      address: $address
      categories: $categories
      description: $description
      gpsPin: $gpsPin
      name: $name
      picture: $picture
      rating: $rating
      city: $city
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      name
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
