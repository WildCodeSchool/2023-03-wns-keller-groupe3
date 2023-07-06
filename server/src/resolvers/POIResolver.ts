import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { GpsPin, POI } from "../entities/POI";
import { POIService } from "../services/POIService";
import { Category } from "../entities/Category";
import { City } from "../entities/City";
import { CityInput } from "./input_types/CityInputType";
import { CategoryInput } from "./input_types/CategoryInput";

const pointOfInterest = new POIService();

@Resolver(POI)
export class POIResolver {
  @Query(() => [POI])
  async getAllPOIs(): Promise<POI[]> {
    return await pointOfInterest.getAllPOIs();
  }

  @Query(() => POI)
  async getPOIById(@Arg("id") id: string): Promise<POI> {
    return await pointOfInterest.getPOIById(id);
  }

//   TODO Queries "getAllPOIsByCategory" and "getAllPOIsByCity"

// TODO create a class definition "@InputType" https://typegraphql.com/docs/resolvers.html#:~:text=!%5D%0A%7D-,Input%20types,-GraphQL%20mutations%20can
// TODO Make class-validations
  @Mutation(() => POI)
  async createPOI(
    @Arg("latitude") latitude: number,
    @Arg("longitude") longitude: number,
    @Arg("gpsPin") gpsPin: GpsPin,
    @Arg("address") address: string,
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("picture") picture: string,
    @Arg("rating") rating: number,
    @Arg("categories", type => [CategoryInput]) categoriesID: Category[],
    @Arg("city", type => CityInput) cityID: City,
  ): Promise<POI | string> {
    // TODO Manage error handling
    return await pointOfInterest.createPOI({latitude, longitude, gpsPin, address, name, description, picture, rating, categoriesID, cityID})
  }

  // TODO Mutations "updatePOI" and "deletePOI"
}
