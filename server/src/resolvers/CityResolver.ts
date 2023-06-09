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

  // @Query(() => [City])
  // async getAllPOIsByCity(): Promise<City[]> {
  //   const AllPOIsByCity = await dataSource
  //     .getRepository(City)
  //     .find({ relations: { pointsOfInterest: {} } });
  //   return AllPOIsByCity;
  // }

  @Mutation(() => City)
  async createCity(
    @Arg("name") name: string,
    @Arg("picture") picture: string
  ): Promise<City> {
    return await city.createCity(name, picture);
  }

  @Mutation(() => String)
  async deleteToCity(@Arg("id") id: string): Promise<string> {
    try {
      await dataSource.getRepository(City).delete({ id });
      return await city.DeleteCity(id);
    } catch (err) {
      return `Error while deleting city`;
    }
  }

  @Mutation(() => City)
  async UpdateToCity(
    @Arg("id") id: string,
    @Arg("name") name: string,
    @Arg("picture") picture: string
  ): Promise<City> {
    return await city.updatedCity(id, name, picture);
    // const updatedCity = await this.cityService.updateCity(id, name, picture);
    // return updatedCity;
    // const cityRepository = dataSource.getRepository(City);
    // const cityToUpdate = await cityRepository.findOne({ where: { id } });

    // if (cityToUpdate === null) {
    //   throw new Error("City not found");
    // }

    // cityToUpdate.name = name;
    // cityToUpdate.picture = picture;

    // const updatedCity = await cityRepository.save(cityToUpdate);
    // return updatedCity;
  }
}
