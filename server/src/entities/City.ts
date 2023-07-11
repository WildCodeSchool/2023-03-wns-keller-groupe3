import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { POI } from "./POI";
import { User } from "./User";

@ObjectType()
@Entity()
export class City {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({
    type: "varchar",
    length: 54,
    unique: true,
  })
  name: string;

  @Field()
  @Column({
    type: "varchar",
    length: 255,
  })
  picture: string;

  @Field()
  @Column("double precision", { nullable: true })
  latitude: number;

  @Field()
  @Column("double precision", { nullable: true })
  longitude: number;

  @Field(() => [POI])
  @OneToMany(() => POI, (pointOfInterest) => pointOfInterest.city)
  pointsOfInterest: POI[];

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
