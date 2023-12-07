import { DeleteResult } from "typeorm";
import { Role, User } from "../entities/User";
import dataSource from "../utils";
import * as argon2 from "argon2";

export interface updateArgs {
  name: string;
  email: string;
  role: Role;
}
export class UserService {
  async getAllUsers(): Promise<User[]> {
    return await dataSource.getRepository(User).find();
  }

  async getUserBy(id: string): Promise<User> {
    return await dataSource.getRepository(User).findOneOrFail({
      where: { id },
      relations: { city: true },
      select: { id: true, name: true, role: true, email: true },
    });
  }

  async create(email: string, name: string, password: string): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.hashedPassword = await argon2.hash(password);
    const userFromDB = await dataSource.manager.save(User, newUser);
    return userFromDB;
  }

  async update(id: string, { name, email, role }: updateArgs): Promise<User> {
    return await dataSource.getRepository(User).save({ id, name, email, role });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await dataSource.getRepository(User).delete({ id });
  }
}
