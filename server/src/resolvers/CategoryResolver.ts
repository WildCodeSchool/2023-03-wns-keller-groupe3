import { Arg, Mutation, Resolver, Query, Authorized } from "type-graphql";
import { Category } from "../entities/Category";
import dataSource from "../utils";
import { CategoryService } from "../services/CategoryService";
import { POI } from "../entities/POI";
import { Role } from "../entities/User";
import SecureInput from "../security/SecureInput";

const category = new CategoryService();

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    return await dataSource.getRepository(Category).find();
  }

  @Query(() => Category)
  async getCategoryBy(@Arg("id") id: string): Promise<Category> {
    return await category.getCategoryBy(id);
  }

  @Authorized([Role.SUPERADMIN])
  @Mutation(() => Category)
  async createCategory(@Arg("name") name: string): Promise<Category> {
    return await category.createCategory(SecureInput(name));
  }

  @Authorized([Role.SUPERADMIN])
  @Mutation(() => String)
  async updateCategory(
    @Arg("id") id: string,
    @Arg("name") name: string
  ): Promise<string> {
    try {
      await category.updateCategory(id, SecureInput(name));
      return `Category with ID : ${id} has been successfully updated`;
    } catch (err) {
      console.error(err);
      return `Error while updating category with ID : ${id}`;
    }
  }

  @Authorized([Role.SUPERADMIN])
  @Mutation(() => String)
  async deleteCategory(@Arg("id") id: string): Promise<string> {
    const categoryToDelete = await dataSource
      .getRepository(Category)
      .findOneByOrFail({ id });
    const poisRelated = await dataSource
      .getRepository(POI)
      .findBy({ categories: { id: categoryToDelete.id } });
    // TODO would be better to remove the category from the POIs
    if (poisRelated.length > 0) {
      return `This category contains points of interest. Please remove the category from these points before, then try again.`;
    }

    try {
      await category.deleteCategory(id);
      return `Category with ID : ${id} has been successfully deleted`;
    } catch (err) {
      console.error(err);
      return `Error while deleting category with ID : ${id}`;
    }
  }
}
