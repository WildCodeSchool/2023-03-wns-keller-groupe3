import { Field, InputType } from "type-graphql";
import { User, Role } from "../../entities/User";
import { City } from "../../entities/City";
import { Column, ManyToOne } from "typeorm";

@InputType("UserUpdateInput")
export class UserUpdateInput implements Partial<User> {
  // @Field()
  // @MaxLength(100)
  // id: string;

  // @Field()
  // @Column("double precision")
  // latitude?: number;

  // @Field()
  // @Column("double precision")
  // longitude?: number;

  @Field()
  id: string;

  @Field()
  @Column({
    type: "varchar",
    length: 40,
  })
  name: string;

  @Field()
  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  email: string;

  @Field()
  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Field(() => City, { nullable: true })
  @ManyToOne(() => City, (city) => city.users, { nullable: true })
  city: City | null;
}