import { Arg, Mutation, Resolver, Query } from "type-graphql";

import { User } from "../entities/User";
import { UserService } from "../services/UserService";

import dataSource from "../utils";

import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

const user = new UserService();

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    try {
      return await user.getAllUsers();
    } catch (error) {
      console.error("Something went wrong when fetching users");
      throw new Error("Something went wrong when fetching users");
    }
  }

  @Query(() => User)
  async getUserBy(@Arg("id") id: string): Promise<User> {
    try {
      return await user.getUserBy(id);
    } catch (error) {
      console.error(`User with ID : ${id} not found`);
      throw new Error(`User not found`);
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
      return await user.getUserBy(id);
    } catch (error) {
      console.error(`Failed to update user with ID : ${id}`);
      throw new Error(`Something went wrong when updating settings`);
    }
  }

  @Mutation(() => String)
  async deleteUser(@Arg("id") id: string): Promise<string> {
    try {
      await user.delete(id);
      return `User with ID : ${id} deleted`;
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

  @Query(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String | undefined> {
    const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ email });

    try {
      if (await argon2.verify(user.hashedPassword, password)) {
        const token = jwt.sign(
          { email, role: user.role },
          process.env.JWT_SECRET_KEY as jwt.Secret
        );
        return token;
      } else {
        throw new Error("error");
      }
    } catch (err) {
      console.error(err);
    }
  }
}
