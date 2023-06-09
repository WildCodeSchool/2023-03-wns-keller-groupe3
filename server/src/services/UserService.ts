import { User } from "../entities/User";
import dataSource from "../utils";
import * as argon2 from "argon2";

export class UserService {
  async getUsers(): Promise<User[]> {
    return await dataSource.getRepository(User).find();
  }

  async getUser(id: string): Promise<User> {
    return await dataSource.getRepository(User).findOneByOrFail({ id });
  }

  async createUser(
    email: string,
    name: string,
    password: string
  ): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.hashedPassword = await argon2.hash(password);
    const userFromDB = await dataSource.manager.save(User, newUser);
    console.log(userFromDB);
    return userFromDB;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await dataSource.getRepository(User).findOneBy({ id });
    if (user == null) {
      throw new Error(`User with ID: ${id} not found`);
    }
    await dataSource.getRepository(User).remove(user);
    return user;
  }
}
