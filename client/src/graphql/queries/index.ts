import { gql } from "../__generated__/";

export const GET_CITIES = gql(`
  query GetAllCities {
    getAllCities {
      id
      name
      picture
    }
  }
`);

export const GET_ONE_CITY = gql(`
  query GetCityBy($getCityById: String!) {
    getCityBy(id: $getCityById) {
      id
      name
      picture
      latitude
      longitude
      pointsOfInterest {
        id
        name
        picture
        description
        address
        latitude
        longitude
        gps_pin
        categories {
          id
          name
        }
      }
    }
  }
`);

export const GET_CATEGORIES = gql(`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`);

export const GET_USER = gql(`
  query GetUserBy {
    getUserBy {
      id
      name
      email
      role
      city {
        id
      }
    }
  }
`);

export const LOGIN = gql(`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`);
