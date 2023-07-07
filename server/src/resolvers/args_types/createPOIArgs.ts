import { ArgsType, Field, Int } from "type-graphql";
import { GpsPin } from "../../entities/POI";
import { Category } from "../../entities/Category";
import { City } from "../../entities/City";


// TODO : Validation https://typegraphql.com/docs/validation.html
@ArgsType()
export class createPOIArgs {
    @Field(type => Int)
    latitude: number;

    @Field(type => Int)
    longitude: number;

    @Field(type => GpsPin)
    gpsPin: GpsPin;

    @Field()
    address: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    picture: string;

    @Field(type => Int)
    rating: number;

    @Field(type => [Category])
    categories: Category[];

    @Field(type => City)
    city: City;
}
