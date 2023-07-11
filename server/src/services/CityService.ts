import { City } from "../entities/City";
import dataSource from "../utils";

export class CityService {
  async getCityById(id: string): Promise<City> {
    return await dataSource
      .getRepository(City)
      .findOneOrFail({ where: { id }, relations: { pointsOfInterest: true } });
  }

  async createCity(
    name: string,
    picture: string,
    latitude: number,
    longitude: number
  ): Promise<City> {
    const newCity = new City();
    newCity.name = name.trim();
    newCity.picture = picture.trim();
    newCity.latitude = latitude;
    newCity.longitude = longitude;
    const city = await dataSource.getRepository(City).save(newCity);
    return city;
  }

  async DeleteCity(id: string): Promise<string> {
    await dataSource.getRepository(City).delete({ id });
    return "city deleted";
  }

  async updatedCity(
    id: string,
    name: string,
    picture: string,
    latitude: number,
    longitude: number
  ): Promise<City> {
    try {
      const cityRepository = dataSource.getRepository(City);
      const cityToUpdate = await cityRepository.findOne({ where: { id } });

      // TODO move validation logic inside the Resolver
      if (cityToUpdate === null) {
        throw new Error("City not found");
      }

      cityToUpdate.name = name;
      cityToUpdate.picture = picture;
      cityToUpdate.latitude = latitude;
      cityToUpdate.longitude = longitude;

      const updatedCity = await cityRepository.save(cityToUpdate);
      return updatedCity;
    } catch {
      throw new Error(
        `An error occurred while updating the city with ID : ${id}`
      );
    }
  }
}
