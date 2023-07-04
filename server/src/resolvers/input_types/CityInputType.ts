import { Field, InputType } from "type-graphql";
import { City } from "../../entities/City";

@InputType("CityInput")
export class CityInput implements Partial<City> {
  @Field()
  name: string;
}