import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";

const user = new UserService();

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async user(@Arg("id") id: string): Promise<User> {
    return await user.getUser(id);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await user.getUsers();
  }

  @Mutation(() => User)
  async signup(
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<User> {
    if (password.trim() === "") {
      throw new Error("Password can't be empty");
    }
    return await user.createUser(email, name, password);
  }

  @Mutation(() => String)
  async delete(@Arg("id") id: string): Promise<string> {
    await user.deleteUser(id);
    return `User with ${id} deleted`;
  }
}
