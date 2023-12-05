import { Arg, Mutation, Resolver, Query, Authorized } from "type-graphql";
import { GpsPin, POI } from "../entities/POI";
import { POIService } from "../services/POIService";
import { Category } from "../entities/Category";
import { City } from "../entities/City";
import { CityInput } from "./input_types/CityInputType";
import { CategoryInput } from "./input_types/CategoryInput";
import { ApolloError } from "apollo-server";
import { Role } from "../entities/User";

const pointOfInterest = new POIService();

@Resolver(POI)
export class POIResolver {
  @Query(() => [POI])
  async getAllPOIs(): Promise<POI[]> {
    return await pointOfInterest.getAllPOIs();
  }

  @Query(() => POI)
  async getPOIBy(@Arg("id") id: string): Promise<POI> {
    return await pointOfInterest.getPOIBy(id);
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.SUPERUSER])
  @Mutation(() => POI)
  async createPOI(
    @Arg("latitude") latitude: number,
    @Arg("longitude") longitude: number,
    @Arg("gpsPin") gpsPin: GpsPin,
    @Arg("address") address: string,
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("picture") picture: string,
    @Arg("categories", () => [CategoryInput]) categories: Category[],
    @Arg("city", () => CityInput) city: City
  ): Promise<POI | string> {
    const latitudeRange =
      city.latitude + 0.05 > latitude && city.latitude - 0.05 < latitude;
    const longitudeRange =
      city.longitude + 0.05 > longitude && city.longitude - 0.05 < longitude;
    if (!latitudeRange || !longitudeRange)
      throw new ApolloError("Le point d'intêret est en dehors de la ville");
    if (
      name.length === 0 ||
      picture.length === 0 ||
      latitude === null ||
      longitude === null ||
      gpsPin === null ||
      address.length === 0 ||
      description.length === 0 ||
      city === null ||
      categories === null
    ) {
      throw new ApolloError(
        "Tous les champs sont obligatoires",
        "FIELDS_REQUIRED"
      );
    }
    try {
      return await pointOfInterest.createPOI({
        latitude,
        longitude,
        gpsPin,
        address,
        name,
        description,
        picture,
        categories,
        city,
      });
    } catch (error) {
      throw new ApolloError("Une erreur est survenue", "POI_CREATION_ERROR");
    }
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Mutation(() => Boolean)
  async deletePOI(@Arg("id") id: string): Promise<boolean> {
    return await pointOfInterest.deletePOI(id);
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.SUPERUSER])
  @Mutation(() => POI)
  async updatePOI(
    @Arg("id") id: string,
    @Arg("latitude", { nullable: true }) latitude: number,
    @Arg("longitude", { nullable: true }) longitude: number,
    @Arg("gpsPin", { nullable: true }) gpsPin: GpsPin,
    @Arg("address", { nullable: true }) address: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("picture", { nullable: true }) picture: string,
    @Arg("categories", (type) => [CategoryInput], { nullable: true })
    categories: Category[],
    @Arg("city", (type) => CityInput, { nullable: true }) city: City
  ): Promise<POI> {
    try {
      return await pointOfInterest.updatePOI(id, {
        latitude,
        longitude,
        gps_pin: gpsPin,
        address,
        name,
        description,
        picture,
        categories,
        city,
      });
    } catch (error) {
      console.error(`Failed to update POI with ID: ${id}`);
      throw new Error(`Something went wrong when updating the POI`);
    }
  }
}
