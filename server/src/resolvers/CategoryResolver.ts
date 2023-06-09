import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { Category } from "../entities/Category";
import dataSource from "../utils";
import { CategoryService } from "../services/CategoryService";

const category = new CategoryService();

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    return await dataSource.getRepository(Category).find();
  }

  @Query(() => Category)
  async getCategoryById(@Arg("id") id: string): Promise<Category> {
    return await category.getCategoryById(id);
  }

  @Mutation(() => Category)
  async createCategory(@Arg("name") name: string): Promise<Category> {
    const newCategory = new Category();
    newCategory.name = name;

    const categoryFromDB = await dataSource.manager.save(Category, newCategory);
    console.log(categoryFromDB);
    return categoryFromDB;
  }

  @Mutation(() => String)
  async deleteCategory(@Arg("id") id: string): Promise<string> {
    try {
      await dataSource.getRepository(Category).delete({ id });
      return `Category has been successfully deleted`;
    } catch (err) {
      console.log(err);
      return `Error while deleting category`;
    }
  }
}
