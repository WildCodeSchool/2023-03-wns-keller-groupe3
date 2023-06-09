import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";

const user = new UserService();

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async user(@Arg("id") id: string): Promise<User> {
    try {
      return await user.getOne(id);
    } catch (error) {
      console.error(`User with ID : ${id} not found`);
      throw new Error(`User not found`);
    }
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    try {
      return await user.getAll();
    } catch (error) {
      console.error("Something went wrong when fetching users");
      throw new Error("Something went wrong when fetching users");
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("email", { nullable: true }) email: string
  ): Promise<User> {
    try {
      await user.update(id, { name, email });
      return await user.getOne(id);
    } catch (error) {
      console.error(`Failed to update user with ID : ${id}`);
      throw new Error(`Something went wrond when updating settings`);
    }
  }

  @Mutation(() => String)
  async deleteUser(@Arg("id") id: string): Promise<string> {
    try {
      await user.delete(id);
      return `User with ${id} deleted`;
    } catch (error) {
      console.error(`Failed to delete user with ID : ${id}`);
      throw new Error(`Something went wrong`);
    }
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<User> {
    if (password.trim() === "") {
      console.error(`Password can't be empty`);
      throw new Error("Password can't be empty");
    }
    return await user.create(email, name, password);
  }
}
