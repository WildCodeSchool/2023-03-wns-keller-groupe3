import { createClient } from "pexels";

const client = createClient(process.env.REACT_APP_PEXELS_API!);

async function getCityCardPhoto(cityName: string) {
  try {
    const result = await client.photos.search({ query: cityName, per_page: 1 });
    //@ts-ignore
    // !! dunno why ts is crying
    return result.photos[0].src.large as string;
  } catch (error) {
    console.log(error);
  }
}
export { getCityCardPhoto };
