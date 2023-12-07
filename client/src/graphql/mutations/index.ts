import { gql } from "../__generated__/";

export const ADD_CITY = gql(`
  mutation CreateCity(
    $name: String!
    $picture: String!
    $latitude: Float
    $longitude: Float
  ) {
    createCity(
      name: $name
      picture: $picture
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      name
      picture
      latitude
      longitude
    }
  }
`);

export const ADD_POI = gql(`
  mutation CreatePOI(
    $address: String!
    $categories: [CategoryInput!]!
    $description: String!
    $gpsPin: String!
    $name: String!
    $picture: String!
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
      city: $city
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      name
    }
  }
`);

export const CREATE_USER = gql(`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`);

export const UPDATE_USER = gql(`
  mutation UpdateUser($id: String!, $email: String, $name: String, $role: String, $cityId: String) {
    updateUser(id: $id, email: $email, name: $name, role: $role, cityId: $cityId) {
      id
      email
      name
      role
      city{
        id
        name
      }
    }
  }
`);
