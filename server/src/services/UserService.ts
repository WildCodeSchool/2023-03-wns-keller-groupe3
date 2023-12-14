import { DeleteResult } from "typeorm";
import { City } from "../entities/City";
import { Role, User } from "../entities/User";
import { UserUpdateInput } from "../resolvers/input_types/UserInputType";
import dataSource from "../utils";
import * as argon2 from "argon2";

export interface updateArgs {
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

  async update(id: string, Args: updateArgs): Promise<UserUpdateInput> {
    try {
      const userToUpdate = await dataSource.getRepository(User).findOne({ where: { id } });

      if (userToUpdate === null) throw new Error("User not found");

      userToUpdate.role = Args.role ?? userToUpdate.role;
      userToUpdate.city = (Args.cityId !== undefined) ? await dataSource.getRepository(City).findOneBy({ id: Args.cityId }) : userToUpdate.city;

      const updatedUser = await dataSource.getRepository(User).save(userToUpdate);
      console.log('updatedUser =================>', updatedUser)
      return updatedUser;
    } catch {
      throw new Error("User not found");
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    return await dataSource.getRepository(User).delete({ id });
  }
}
