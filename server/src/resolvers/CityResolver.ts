import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { City } from "../entities/City";
import dataSource from "../utils";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(): Promise<City[]> {
    const cities = await dataSource.getRepository(City).find();
    return cities;
  }

  @Query(() => City)
  async getOneCity(@Arg("name", () => String) name: string): Promise<City> {
    const Onecity = await dataSource
      .getRepository(City)
      .findOneOrFail({ where: { name } });
    return Onecity;
  }

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

  @Mutation(() => City, { nullable: true })
  async deleteToCity(@Arg("name") name: string): Promise<City | null> {
    const cityRepository = dataSource.getRepository(City);
    const deleteToCity = await cityRepository.findOne({ where: { name } });

    if (deleteToCity !== null && deleteToCity !== undefined) {
      await cityRepository.remove(deleteToCity);
      return deleteToCity;
    }

    return null;
  }

  // @Mutation(() => City)
  // async EditCity(
  //   @Arg("name") name: string,
  //   @Arg("picture") picture: string
  // ): Promise<City> {
  //   const newCity = new City();
  //   newCity.name = name;
  //   newCity.picture = picture;

  //   const cityFromDB = await dataSource.manager.save(City, newCity);
  //   return cityFromDB;
  // }

  //     // ! DO NOT FORGET
  //     // TODO hash password in database
  //     const userFromDB = await dataSource.manager.save(User, newUser);
  //     console.log(userFromDB);
  //     return userFromDB;
  //   }
}
