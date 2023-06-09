import { City } from "../entities/City";
import dataSource from "../utils";

export class CityService {
  async getCityById(id: string): Promise<City> {
    return await dataSource
      .getRepository(City)
      .findOneOrFail({ where: { id } });
  }

  async createCity(name: string, picture: string): Promise<City> {
    const newCity = new City();
    newCity.name = name;
    newCity.picture = picture;

    const cityFromDB = await dataSource.getRepository(City).save(newCity);
    return cityFromDB;
  }

  async DeleteCity(id: string): Promise<string> {
    await dataSource.getRepository(City).delete({ id });
    return "city deleted";
  }

  async updatedCity(id: string, name: string, picture: string): Promise<City> {
    try {
      const cityRepository = dataSource.getRepository(City);
      const cityToUpdate = await cityRepository.findOne({ where: { id } });

      if (cityToUpdate === null) {
        throw new Error("City not found");
      }

      cityToUpdate.name = name;
      cityToUpdate.picture = picture;

      const updatedCity = await cityRepository.save(cityToUpdate);
      return updatedCity;
    } catch {
      throw new Error("An error occurred while updating the city: ");
    }
  }
}
