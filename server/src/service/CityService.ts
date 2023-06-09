import { City } from "../entities/City";
import dataSource from "../utils";

export class CityService {
  async getAllCities(name: string): Promise<City[]> {
    return await dataSource.getRepository(City).find();
  }

  async getCityById(id: string): Promise<City> {
    return await dataSource
      .getRepository(City)
      .findOneOrFail({ where: { id } });
  }
}
