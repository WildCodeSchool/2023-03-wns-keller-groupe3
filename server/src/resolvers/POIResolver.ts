import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { GpsPin, POI } from "../entities/POI";
// import dataSource from "../utils";
import { POIService } from "../services/POIService";
import { Category } from "../entities/Category";
import { City } from "../entities/City";
// import { Category } from "../entities/Category";
// import { City } from "../entities/City";

const pointOfInterest = new POIService();

@Resolver(POI)
export class POIResolver {
  @Query(() => [POI])
  async getAllPOIs(): Promise<POI[]> {
    return await pointOfInterest.getAllPOIs();
  }

  @Query(() => POI)
  async getPOIById(@Arg("id") id: string): Promise<POI> {
    return await pointOfInterest.getPOIById(id);
  }

//   TODO
//   @Query(() => [POI])
//   async getAllPOIsByCategory(@Arg("categories") categories: Category[]): Promise<POI[]> {
//     return await pointOfInterest.getAllPOIsByCategory(categories);
//   }

//   TODO
//   @Query(() => [POI])
//   async getAllPOIsByCity(@Arg("city") city: City): Promise<POI[]> {
//     return await pointOfInterest.getAllPOIsByCity(city);
//   }

  @Mutation(() => POI)
  async createPOI(
    @Arg("latitude") latitude: number,
    @Arg("longitude") longitude: number,
    @Arg("gpsPin") gpsPin: GpsPin,
    @Arg("address") address: string,
    @Arg("description") description: string,
    @Arg("picture") picture: string,
    @Arg("rating") rating: number,
    @Arg("categories") categories: Category[],
    @Arg("city") city: City,
  ): Promise<POI> {
    return await pointOfInterest.createPOI({latitude, longitude, gpsPin, address, description, picture, rating, categories, city})
  }

//   @Mutation(() => POI)
//   async updatePOI(@Arg("id") id: string): Promise<POI> {
//     try {
//       await dataSource.getRepository(POI).delete({ id });
//       return `Category has been successfully deleted`;
//     } catch (err) {
//       console.log(err);
//       return `Error while deleting category`;
//     }
//   }

//   @Mutation(() => String)
//   async deletePOI(@Arg("id") id: string): Promise<string> {
//     try {
//       await dataSource.getRepository(POI).delete({ id });
//       return `Category has been successfully deleted`;
//     } catch (err) {
//       console.log(err);
//       return `Error while deleting category`;
//     }
//   }
}
