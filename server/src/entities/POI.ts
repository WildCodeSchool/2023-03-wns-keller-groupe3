import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { City } from "./City";

export enum GpsPin {
  // TODO insert paths to different images for GPS pin
  DEFAULT = "default",
}

@ObjectType()
@Entity()
export class POI {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("double precision")
  latitude: number;

  @Field()
  @Column("double precision")
  longitude: number;

  @Field()
  @Column({
    type: "enum",
    enum: GpsPin,
    default: GpsPin.DEFAULT,
  })
  gps_pin: GpsPin;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  address: string;

  @Field()
  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @Field()
  @Column("text")
  description: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  picture: string;

  @Field()
  @Column(
    "int"
    // TODO how to set rating between 0 and 5 : { limit: 5 }
  )
  rating: number;

  @Field({nullable: true})
  @Column({
    type: "varchar",
    length: 500,
    nullable: true,
  })
  comments: string;

  @Field(() => City)
  @ManyToOne(() => City, (city) => city.pointsOfInterest)
  city: City;

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.pois)
  @JoinTable()
  categories: Category[];
}
