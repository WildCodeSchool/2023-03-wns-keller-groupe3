import * as maptilerClient from "@maptiler/client";

maptilerClient.config.apiKey = process.env.MAP_TILER_KEY!;

async function getLatAndLongByCityName(cityName: string) {
  const result = await maptilerClient.geocoding.forward(cityName);
  console.log(result);
  return result;
}

export { getLatAndLongByCityName };
