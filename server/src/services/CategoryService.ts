import { DeleteResult } from "typeorm";
import { Category } from "../entities/Category";
import dataSource from "../utils";

export class CategoryService {
  async getCategoryById(id: string): Promise<Category> {
    return await dataSource.getRepository(Category).findOneByOrFail({ id });
  }

  async createCategory(name: string): Promise<Category> {
    return await dataSource.getRepository(Category).save({ name });
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    return await dataSource.getRepository(Category).save({ id, name });
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    return await dataSource.getRepository(Category).delete({ id });
  }
}
