import { Category } from "../entities/Category";
import dataSource from "../utils";

export class CategoryService {
  async getCategoryById(id: string): Promise<Category> {
    return await dataSource.getRepository(Category).findOneByOrFail({ id });
  }
}
