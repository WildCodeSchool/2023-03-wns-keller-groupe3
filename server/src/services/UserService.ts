import { DeleteResult } from "typeorm";
import { User } from "../entities/User";
import dataSource from "../utils";
import * as argon2 from "argon2";

export interface updateArgs {
  name: string;
  email: string;
}
export class UserService {
  async getAllUsers(): Promise<User[]> {
    return await dataSource.getRepository(User).find();
  }

  async getUserBy(id: string): Promise<User> {
    return await dataSource
      .getRepository(User)
      .findOneOrFail({ where: { id }, relations: { city: true } });
  }

  async create(email: string, name: string, password: string): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.hashedPassword = await argon2.hash(password);
    const userFromDB = await dataSource.manager.save(User, newUser);
    return userFromDB;
  }

  async update(id: string, { name, email }: updateArgs): Promise<User> {
    return await dataSource.getRepository(User).save({ id, name, email });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await dataSource.getRepository(User).delete({ id });
  }
}
