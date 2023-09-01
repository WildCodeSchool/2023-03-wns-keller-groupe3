import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { POI } from "./POI";

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  name: string;

  @ManyToMany(() => POI, (poi) => poi.categories)
  pois: POI[];
}
