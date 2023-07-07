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

// TODO Queries "getAllPOIsByCategory" and "getAllPOIsByCity"

// https://typegraphql.com/docs/resolvers.html#:~:text=!%5D%0A%7D-,Input%20types,-GraphQL%20mutations%20can
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
    @Arg("categories", type => [CategoryInput]) categories: Category[],
    @Arg("city", type => CityInput) city: City,
  ): Promise<POI | string> {
    // TODO Manage error handling
    return await pointOfInterest.createPOI({latitude, longitude, gpsPin, address, name, description, picture, rating, categories, city})
  }

  @Mutation(() => Boolean)
    async deletePOI(@Arg("id") id: string): Promise<boolean> {
      return await pointOfInterest.deletePOI(id);
  }

  @Mutation(() => POI)
  async updatePOI(
    @Arg("id") id: string,
    @Arg("latitude", { nullable: true }) latitude: number,
    @Arg("longitude", { nullable: true }) longitude: number,
    @Arg("gpsPin", { nullable: true }) gpsPin: GpsPin,
    @Arg("address", { nullable: true }) address: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("picture", { nullable: true }) picture: string,
    @Arg("rating", { nullable: true }) rating: number,
    @Arg("categories", type => [CategoryInput], { nullable: true }) categories: Category[],
    @Arg("city", type => CityInput, { nullable: true }) city: City
  ): Promise<POI> {
    try {
      return await pointOfInterest.updatePOI(id, { latitude, longitude, gps_pin:gpsPin, address, name, description, picture, rating, categories, city });
    } catch (error) {
      console.error(`Failed to update POI with ID: ${id}`);
      throw new Error(`Something went wrong when updating the POI`);
    }
  }
}
