import { Field, InputType } from "type-graphql";
import { Category } from "../../entities/Category";
import { MaxLength } from "class-validator";

@InputType("CategoryInput")
export class CategoryInput implements Partial<Category> {
  @Field()
  @MaxLength(100)
  id: string;
}