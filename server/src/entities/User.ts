import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";

export enum Role {
  USER = "user",
  SUPERUSER = "superuser",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
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

  @Column({
    type: "varchar",
    length: 255,
  })
  password: string;

  @Field()
  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Field(() => City)
  @ManyToOne(() => City, (city) => city.users)
  city: City;
}
