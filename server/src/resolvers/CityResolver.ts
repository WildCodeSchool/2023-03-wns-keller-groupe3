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
    return await dataSource
      .getRepository(City)
      .findOneOrFail({ where: { id } });
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
    const newCity = new City();
    newCity.name = name;
    newCity.picture = picture;

    const cityFromDB = await dataSource.manager.save(City, newCity);
    return cityFromDB;
  }

  @Mutation(() => String)
  async deleteToCity(@Arg("id") id: string): Promise<string> {
    try {
      await dataSource.getRepository(City).delete({ id });
      return `City has been successfully deleted`;
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
    const cityRepository = dataSource.getRepository(City);
    const cityToUpdate = await cityRepository.findOne({ where: { id } });

    if (cityToUpdate === null) {
      throw new Error("City not found");
    }

    cityToUpdate.name = name;
    cityToUpdate.picture = picture;

    const updatedCity = await cityRepository.save(cityToUpdate);
    return updatedCity;
  }
}
