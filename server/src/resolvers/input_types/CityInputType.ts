import { Field, InputType } from "type-graphql";
import { City } from "../../entities/City";
import { MaxLength } from "class-validator";
import { Column } from "typeorm";

@InputType("CityInput")
export class CityInput implements Partial<City> {
  @Field()
  @MaxLength(100)
  id: string;

  @Field()
  @Column("double precision")
  latitude?: number;

  @Field()
  @Column("double precision")
  longitude?: number;
}
