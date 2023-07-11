import { City } from "../entities/City";
import dataSource from "../utils";

export class CityService {
  async getCityBy(id: string): Promise<City> {
    return await dataSource
      .getRepository(City)
      .findOneOrFail({
        where: { id },
        relations: { pointsOfInterest: { categories: true, city: true } },
      });
  }

  async createCity(
    name: string,
    picture: string,
    latitude: number,
    longitude: number
  ): Promise<City> {
    const cityRepository = dataSource.getRepository(City);
    const city = cityRepository.create({
      name: name.trim(),
      picture: picture.trim(),
      latitude,
      longitude,
    });
    return await cityRepository.save(city);
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
