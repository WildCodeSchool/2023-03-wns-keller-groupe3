import {
  Arg,
  Mutation,
  Resolver,
  Query,
  Float,
  Ctx,
  Authorized,
} from "type-graphql";
import { City } from "../entities/City";
import dataSource from "../utils";
import { CityService } from "../services/CityService";
import { ApolloError } from "apollo-server-errors";
import { Role } from "../entities/User";
import { Context } from "../context.type";

const city = new CityService();

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(@Ctx() context: Context): Promise<City[]> {
    console.log("this is context", context);
    return await dataSource
      .getRepository(City)
      .find({ order: { name: "ASC" } });
  }

  @Query(() => City)
  async getCityBy(@Arg("id", () => String) id: string): Promise<City> {
    return await city.getCityBy(id);
  }

  @Authorized(Role.SUPERADMIN)
  @Mutation(() => City)
  async createCity(
    @Arg("name") name: string,
    @Arg("picture") picture: string,
    @Arg("latitude", () => Float, { nullable: true }) latitude: number,
    @Arg("longitude", () => Float, { nullable: true }) longitude: number
  ): Promise<City> {
    if (
      name.length === 0 ||
      picture.length === 0 ||
      latitude === null ||
      longitude === null
    ) {
      throw new ApolloError(
        "Tous les champs sont obligatoires",
        "FIELDS_REQUIRED"
      );
    }
    try {
      return await city.createCity(name, picture, latitude, longitude);
    } catch (error) {
      throw new ApolloError("Une erreur est survenue", "CITY_CREATION_ERROR");
    }
  }

  @Authorized(Role.SUPERADMIN)
  @Mutation(() => String)
  async deleteCity(@Arg("id") id: string): Promise<string> {
    try {
      await dataSource.getRepository(City).delete({ id });
      return await city.DeleteCity(id);
    } catch (err) {
      return `Error while deleting city with ID : ${id}`;
    }
  }

  @Authorized(Role.SUPERADMIN)
  @Mutation(() => City)
  async UpdateCity(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("picture", { nullable: true }) picture: string,
    @Arg("latitude", { nullable: true }) latitude: number,
    @Arg("longitude", { nullable: true }) longitude: number
  ): Promise<City> {
    return await city.updatedCity(id, name, picture, latitude, longitude);
  }
}
