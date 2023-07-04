import { Field, InputType } from "type-graphql";
import { Category } from "../../entities/Category";

@InputType("CategoryInput")
export class CategoryInput implements Partial<Category> {
  @Field()
  name: string;
}