import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { User } from "../entities/User";
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
    @Arg("password") password: string
  ): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;

    // ! DO NOT FORGET
    // TODO hash password in database
    const userFromDB = await dataSource.manager.save(User, newUser);
    console.log(userFromDB);
    return userFromDB;
  }
}
