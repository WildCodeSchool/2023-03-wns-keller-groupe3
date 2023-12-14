import { Arg, Mutation, Resolver, Query, Ctx, Authorized } from "type-graphql";
import { Role, User } from "../entities/User";
import { UserService } from "../services/UserService";
import dataSource from "../utils";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Context } from "../context.type";
import SecureInput, {
  SecureEmail,
  SecurePassword,
} from "../security/SecureInput";

const user = new UserService();

@Resolver(User)
export class UserResolver {
  @Authorized([Role.SUPERADMIN])
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
  async getUserBy(@Ctx() context?: Context): Promise<User | {}> {
    const userEmail = context?.email;
    if (userEmail === undefined) return {};
    try {
      return await user.getUserBy(userEmail);
    } catch (error) {
      console.error(`User ${userEmail} not found`);
      throw new Error(`User not found`);
    }
  }

  @Query(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String | undefined> {
    const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ email: SecureEmail(email) });

    try {
      if (await argon2.verify(user.hashedPassword, SecurePassword(password))) {
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

  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<User> {
    if (SecurePassword(password) === "") {
      console.error(`Password can't be empty`);
      throw new Error("Password can't be empty");
    }
    return await user.create(
      SecureEmail(email),
      SecureInput(name),
      SecurePassword(password)
    );
  }

  // TODO make sure to restrict USER by ID (only this user can update himself)
  @Authorized([Role.USER, Role.SUPERADMIN])
  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("email", { nullable: true }) email: string
  ): Promise<User> {
    try {
      await user.update(id, {
        name: SecureInput(name),
        email: SecureEmail(email),
      });
      return await user.getUserBy(id);
    } catch (error) {
      console.error(`Failed to update user with ID : ${id}`);
      throw new Error(`Something went wrong when updating settings`);
    }
  }

  // TODO make sure to restrict USER by ID (only this user can delete himself)
  @Authorized([Role.USER, Role.SUPERADMIN])
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
}
