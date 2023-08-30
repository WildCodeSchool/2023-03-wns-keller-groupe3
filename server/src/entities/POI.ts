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
  @Column({
    type: "varchar",
    length: 255,
  })
  address: string;

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.pois)
  @JoinTable()
  categories: Category[];

  @Field()
  @Column("text")
  description: string;

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
    length: 100,
  })
  name: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  picture: string;

  @ManyToOne(() => City, (city) => city.pointsOfInterest)
  city: City;

  @Field()
  @Column("double precision")
  latitude: number;

  @Field()
  @Column("double precision")
  longitude: number;
}
