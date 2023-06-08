import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { City } from "../entities/City";
import dataSource from "../utils";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async cities(): Promise<City[]> {
    const Allcities = await dataSource.getRepository(City).find();
    return Allcities;
  }

  //   @Mutation(() => City)
  //   async createUser(
  //     @Arg("email") email: string,
  //     @Arg("password") password: string
  //   ): Promise<City> {
  //     const newUser = new City();
  //     newUser.email = email;
  //     newUser.password = password;

  //     // ! DO NOT FORGET
  //     // TODO hash password in database
  //     const userFromDB = await dataSource.manager.save(User, newUser);
  //     console.log(userFromDB);
  //     return userFromDB;
  //   }
}
