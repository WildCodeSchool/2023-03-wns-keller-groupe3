import { createClient } from "pexels";

const client = createClient(process.env.REACT_APP_PEXELS_API!);

//  * https://www.pexels.com/fr-fr/api/documentation/
async function getCityCardPhoto(cityName: string) {
  try {
    const result = await client.photos.search({
      query: `${cityName}`,
      per_page: 1,
    });
    //@ts-ignore
    return result.photos[0].src.large as string;
  } catch (error) {
    console.log(error);
  }
}
export { getCityCardPhoto };
