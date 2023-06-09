import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { Category } from "../entities/Category";
import dataSource from "../utils";
import { CategoryService } from "../services/CategoryService";
import { POI } from "../entities/POI";

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
    return await category.createCategory(name);
  }

  @Mutation(() => String)
  async updateCategory(
    @Arg("id") id: string,
    @Arg("name") name: string
  ): Promise<string> {
    try {
      await category.updateCategory(id, name);
      return `Category with id: ${id} has been successfully updated`;
    } catch (err) {
      console.log(err);
      return `Error while updating category with id: ${id}`;
    }
  }

  @Mutation(() => String)
  async deleteCategory(@Arg("id") id: string): Promise<string> {
    const categoryToDelete = await dataSource
      .getRepository(Category)
      .findOneByOrFail({ id });
    const poisRelated = await dataSource
      .getRepository(POI)
      .findBy({ categories: categoryToDelete });

    if (poisRelated !== null) {
      return `This category contains points of interest. Please remove the category from these points before and try again.`;
    }

    try {
      await category.deleteCategory(id);
      return `Category with id: ${id} has been successfully deleted`;
    } catch (err) {
      console.log(err);
      return `Error while deleting category with id: ${id}`;
    }
  }
}
