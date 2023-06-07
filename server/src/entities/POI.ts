import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum GpsPin {
    // TODO insert paths to different images for GPS pin
    DEFAULT = 'default',
}

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  gps_coordinates: number;

  @Field()
  @Column({
    type: 'enum',
    enum: GpsPin,
    default: GpsPin.DEFAULT
  })
  gps_pin: GpsPin;

  @Field()
  @Column(
    "varchar",
    { length: 255 })
  adress: string;

  @Field()
  @Column(
    "varchar",
    { length: 100 })
  name: string;

  @Field()
  @Column("text")
  description: string;

  @Field()
  @Column(
    "varchar",
    { length: 255 })
  picture: string;

  @Field()
  @Column(
    "int",
    // TODO how to set rating between 0 and 5 : { limit: 5 }
    )
  rating: number;

  @Field()
  @Column(
    "varchar",
    { length: 500 })
  comments: string;

  @Field()
  @Column("int")
  city_id: number;
}