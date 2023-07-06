// import { Category } from "../entities/Category";
// import { City } from "../entities/City";
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
    categoriesID: Category[],
    cityID: City,
    comments?: string,
}


export class POIService {
    async getAllPOIs(): Promise<POI[]> {
        return await dataSource.getRepository(POI).find({relations: {categories : true, city: true}});
    }

    async getPOIById(id: string): Promise<POI> {
        return await dataSource.getRepository(POI).findOneOrFail({ where: {id}, relations: {categories : true, city: true}});
    }

    // TODO
    // async getAllPOIsByCategory(categories: Category[]): Promise<POI[]> {
    // return await dataSource.getRepository(POI).findBy({ categories });
    // }

    // TODO
    // async getAllPOIsByCity(city: City): Promise<POI[]> {
    // return await dataSource.getRepository(POI).findBy({ city });
    // }

    async createPOI({latitude, longitude, gpsPin, address, name, description, picture, rating, categoriesID, cityID}: pointOfInterestArgs): Promise<POI> {
        return await dataSource.getRepository(POI).save({latitude, longitude, gpsPin, address, name, description, picture, rating, categoriesID, cityID})
    }

    // TODO : update and delete POI
}
