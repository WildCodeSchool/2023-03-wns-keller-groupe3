import { DeleteResult } from "typeorm";
import { Role, User } from "../entities/User";
import dataSource from "../utils";
import * as argon2 from "argon2";

export interface updateArgs {
  name: string;
  email: string;
  role: Role;
  cityId: string;
}
export class UserService {
  async getAllUsers(): Promise<User[]> {
    return await dataSource.getRepository(User).find();
  }

  async getUserBy(email: string): Promise<User> {
    return await dataSource.getRepository(User).findOneOrFail({
      where: { email },
      relations: { city: true },
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        city: { id: true },
      },
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

  async update(id: string, Args: updateArgs): Promise<User> {
    await dataSource.getRepository(User).update(id, {
      name: Args.name,
      email: Args.email,
      role: Args.role,
      city: { id: Args.cityId },
    });
    return await this.getUserBy(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await dataSource.getRepository(User).delete({ id });
  }
}
