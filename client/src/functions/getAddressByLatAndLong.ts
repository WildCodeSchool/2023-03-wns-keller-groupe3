import * as maptilerClient from "@maptiler/client";
maptilerClient.config.apiKey = process.env.REACT_APP_MAP_TILER_KEY!;

//  * https://docs.maptiler.com/client-js/geocoding#forward
async function getAddressByLatAndLong(position: number[]) {
  try {
    const adress = await maptilerClient.geocoding.reverse(position);
    return adress.features[0].place_name;
  } catch (error) {
    console.error(error);
  }
}
export { getAddressByLatAndLong };
