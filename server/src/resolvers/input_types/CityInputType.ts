import { Field, InputType } from "type-graphql";
import { City } from "../../entities/City";
import { MaxLength } from "class-validator";

@InputType("CityInput")
export class CityInput implements Partial<City> {
  @Field()
  @MaxLength(100)
  id: string;
}