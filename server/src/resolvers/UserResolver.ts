import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { User } from "../entities/User";
import * as argon2 from "argon2";
import dataSource from "../utils";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await dataSource.getRepository(User).find();
    return users;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.hashedPassword = await argon2.hash(password);
    const userFromDB = await dataSource.manager.save(User, newUser);
    console.log(userFromDB);
    return userFromDB;
  }
}
