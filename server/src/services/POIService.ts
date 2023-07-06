import { GpsPin, POI } from "../entities/POI";
import dataSource from "../utils";
import { Category } from "../entities/Category";
import { City } from "../entities/City";

// check => https://typegraphql.com/docs/validation.html
interface pointOfInterestArgs {
    latitude: number,
    longitude: number,
    gpsPin: GpsPin,
    address: string,
    name: string,
    description: string,
    picture: string,
    rating: number,
    categories: Category[],
    city: City,
    comments?: string,
}


export class POIService {
    async getAllPOIs(): Promise<POI[]> {
        return await dataSource.getRepository(POI).find({relations: {categories : true, city: true}});
    }

    async getPOIById(id: string): Promise<POI> {
        return await dataSource.getRepository(POI).findOneOrFail({ where: {id}, relations: {categories : true, city: true}});
    }

    // TODO "getAllPOIsByCategory" and "getAllPOIsByCity"

    async createPOI({latitude, longitude, gpsPin, address, name, description, picture, rating, categories, city}: pointOfInterestArgs): Promise<POI> {
        return await dataSource.getRepository(POI).save({latitude, longitude, gpsPin, address, name, description, picture, rating, categories, city})
    }

    async deletePOI(id: string): Promise<boolean> {
        const poiRepository = dataSource.getRepository(POI);
        const deleteResult = await poiRepository.delete(id);

        if (deleteResult.affected === 0) {
          throw new Error("Le POI spécifié n'existe pas");
        }

        return true;
      }

    async updatePOI(
        id: string,
        { latitude, longitude, gpsPin, address, name, description, picture, rating, categories, city }: pointOfInterestArgs
      ): Promise<POI> {
        const poiRepository = dataSource.getRepository(POI);
        let poi = await poiRepository.findOneByOrFail({ id });

        poi = {
          ...poi,
          latitude: latitude !== undefined ? latitude : poi.latitude,
          longitude: longitude !== undefined ? longitude : poi.longitude,
          gps_pin: gpsPin !== undefined ? gpsPin : poi.gps_pin,
          address: address !== undefined ? address : poi.address,
          name: name !== undefined ? name : poi.name,
          description: description !== undefined ? description : poi.description,
          picture: picture !== undefined ? picture : poi.picture,
          rating: rating !== undefined ? rating : poi.rating,
          categories: categories !== undefined ? categories : poi.categories,
          city: city !== undefined ? city : poi.city,
        };

        return await poiRepository.save(poi);
      }
}

