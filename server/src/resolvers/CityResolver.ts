import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { City } from "../entities/City";
import dataSource from "../utils";
import { CityService } from "../service/CityService";

const city = new CityService();

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(): Promise<City[]> {
    return await dataSource.getRepository(City).find();
  }

  @Query(() => City)
  async getCityById(@Arg("id", () => String) id: string): Promise<City> {
    return await city.getCityById(id);
  }

  @Mutation(() => City)
  async createCity(
    @Arg("name") name: string,
    @Arg("picture") picture: string
  ): Promise<City> {
    return await city.createCity(name, picture);
  }

  @Mutation(() => String)
  async deleteCity(@Arg("id") id: string): Promise<string> {
    try {
      await dataSource.getRepository(City).delete({ id });
      return await city.DeleteCity(id);
    } catch (err) {
      return `Error while deleting city with ID : ${id}`;
    }
  }

  @Mutation(() => City)
  async UpdateCity(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("picture", { nullable: true }) picture: string
  ): Promise<City> {
    return await city.updatedCity(id, name, picture);
  }
}
