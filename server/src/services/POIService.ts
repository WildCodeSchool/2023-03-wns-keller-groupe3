import { GpsPin, POI } from "../entities/POI";
import dataSource from "../utils";
import { Category } from "../entities/Category";
import { City } from "../entities/City";

// check => https://typegraphql.com/docs/validation.html
interface pointOfInterestArgs {
  latitude: number;
  longitude: number;
  gpsPin: GpsPin;
  address: string;
  name: string;
  description: string;
  picture: string;
  categories: Category[];
  city: City;
}

export class POIService {
  async getAllPOIs(): Promise<POI[]> {
    return await dataSource
      .getRepository(POI)
      .find({ relations: { categories: true } });
  }

  async getPOIBy(id: string): Promise<POI> {
    return await dataSource.getRepository(POI).findOneOrFail({
      where: { id },
      relations: { categories: true },
    });
  }

  // TODO "getAllPOIsByCategory" and "getAllPOIsByCity"

  async createPOI({
    latitude,
    longitude,
    gpsPin,
    address,
    name,
    description,
    picture,
    categories,
    city,
  }: pointOfInterestArgs): Promise<POI> {
    return await dataSource.getRepository(POI).save({
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
  }

  async deletePOI(id: string): Promise<boolean> {
    const poiRepository = dataSource.getRepository(POI);
    const deleteResult = await poiRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new Error("Error : POI doesn't exist.");
    }

    return true;
  }

  async updatePOI(id: string, poiUpdate: Partial<POI>): Promise<POI> {
    const poiRepository = dataSource.getRepository(POI);
    const poi = await poiRepository.findOneByOrFail({ id });

    Object.assign(poi, poiUpdate);

    return await poiRepository.save(poi);
  }
}
