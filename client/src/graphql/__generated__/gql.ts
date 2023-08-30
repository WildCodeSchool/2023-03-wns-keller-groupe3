/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateCity(\n    $name: String!\n    $picture: String!\n    $latitude: Float\n    $longitude: Float\n  ) {\n    createCity(\n      name: $name\n      picture: $picture\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n      picture\n      latitude\n      longitude\n    }\n  }\n": types.CreateCityDocument,
    "\n  mutation CreatePOI(\n    $address: String!\n    $categories: [CategoryInput!]!\n    $description: String!\n    $gpsPin: String!\n    $name: String!\n    $picture: String!\n    $city: CityInput!\n    $latitude: Float!\n    $longitude: Float!\n  ) {\n    createPOI(\n      address: $address\n      categories: $categories\n      description: $description\n      gpsPin: $gpsPin\n      name: $name\n      picture: $picture\n      city: $city\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n    }\n  }\n": types.CreatePoiDocument,
    "\n  mutation CreateUser($email: String!, $name: String!, $password: String!) {\n    createUser(email: $email, name: $name, password: $password) {\n      id\n      email\n      name\n    }\n  }\n": types.CreateUserDocument,
    "\n  query GetAllCities {\n    getAllCities {\n      id\n      name\n      picture\n    }\n  }\n": types.GetAllCitiesDocument,
    "\n  query GetCityBy($getCityById: String!) {\n    getCityBy(id: $getCityById) {\n      id\n      name\n      picture\n      latitude\n      longitude\n      pointsOfInterest {\n        id\n        name\n        picture\n        description\n        address\n        latitude\n        longitude\n        gps_pin\n        categories {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetCityByDocument,
    "\n  query GetPoiByCity($getCityById: String!) {\n    getCityBy(id: $getCityById) {\n      id\n      pointsOfInterest {\n        id\n        name\n        picture\n        description\n        address\n        latitude\n        longitude\n        gps_pin\n        categories {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetPoiByCityDocument,
    "\n  query GetAllCategories {\n    getAllCategories {\n      id\n      name\n    }\n  }\n": types.GetAllCategoriesDocument,
    "\n  query GetUserBy($getUserById: String!) {\n    getUserBy(id: $getUserById) {\n      id\n      name\n      email\n    }\n  }\n": types.GetUserByDocument,
    "\n  query Login($password: String!, $email: String!) {\n    login(password: $password, email: $email)\n  }\n": types.LoginDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCity(\n    $name: String!\n    $picture: String!\n    $latitude: Float\n    $longitude: Float\n  ) {\n    createCity(\n      name: $name\n      picture: $picture\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n      picture\n      latitude\n      longitude\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCity(\n    $name: String!\n    $picture: String!\n    $latitude: Float\n    $longitude: Float\n  ) {\n    createCity(\n      name: $name\n      picture: $picture\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n      picture\n      latitude\n      longitude\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePOI(\n    $address: String!\n    $categories: [CategoryInput!]!\n    $description: String!\n    $gpsPin: String!\n    $name: String!\n    $picture: String!\n    $city: CityInput!\n    $latitude: Float!\n    $longitude: Float!\n  ) {\n    createPOI(\n      address: $address\n      categories: $categories\n      description: $description\n      gpsPin: $gpsPin\n      name: $name\n      picture: $picture\n      city: $city\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePOI(\n    $address: String!\n    $categories: [CategoryInput!]!\n    $description: String!\n    $gpsPin: String!\n    $name: String!\n    $picture: String!\n    $city: CityInput!\n    $latitude: Float!\n    $longitude: Float!\n  ) {\n    createPOI(\n      address: $address\n      categories: $categories\n      description: $description\n      gpsPin: $gpsPin\n      name: $name\n      picture: $picture\n      city: $city\n      latitude: $latitude\n      longitude: $longitude\n    ) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($email: String!, $name: String!, $password: String!) {\n    createUser(email: $email, name: $name, password: $password) {\n      id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($email: String!, $name: String!, $password: String!) {\n    createUser(email: $email, name: $name, password: $password) {\n      id\n      email\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllCities {\n    getAllCities {\n      id\n      name\n      picture\n    }\n  }\n"): (typeof documents)["\n  query GetAllCities {\n    getAllCities {\n      id\n      name\n      picture\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCityBy($getCityById: String!) {\n    getCityBy(id: $getCityById) {\n      id\n      name\n      picture\n      latitude\n      longitude\n      pointsOfInterest {\n        id\n        name\n        picture\n        description\n        address\n        latitude\n        longitude\n        gps_pin\n        categories {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCityBy($getCityById: String!) {\n    getCityBy(id: $getCityById) {\n      id\n      name\n      picture\n      latitude\n      longitude\n      pointsOfInterest {\n        id\n        name\n        picture\n        description\n        address\n        latitude\n        longitude\n        gps_pin\n        categories {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPoiByCity($getCityById: String!) {\n    getCityBy(id: $getCityById) {\n      id\n      pointsOfInterest {\n        id\n        name\n        picture\n        description\n        address\n        latitude\n        longitude\n        gps_pin\n        categories {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPoiByCity($getCityById: String!) {\n    getCityBy(id: $getCityById) {\n      id\n      pointsOfInterest {\n        id\n        name\n        picture\n        description\n        address\n        latitude\n        longitude\n        gps_pin\n        categories {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllCategories {\n    getAllCategories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllCategories {\n    getAllCategories {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserBy($getUserById: String!) {\n    getUserBy(id: $getUserById) {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetUserBy($getUserById: String!) {\n    getUserBy(id: $getUserById) {\n      id\n      name\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Login($password: String!, $email: String!) {\n    login(password: $password, email: $email)\n  }\n"): (typeof documents)["\n  query Login($password: String!, $email: String!) {\n    login(password: $password, email: $email)\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;