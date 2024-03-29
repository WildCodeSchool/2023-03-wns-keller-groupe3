import * as maptilerClient from "@maptiler/client";
maptilerClient.config.apiKey = process.env.REACT_APP_MAP_TILER_KEY!;

//  * https://docs.maptiler.com/client-js/geocoding#forward
async function suggestedCities(cityName: string) {
  if (!cityName) return [];
  try {
    const suggestions = await maptilerClient.geocoding.forward(cityName, {
      limit: 5,
      language: ["fr"],
      types: ["county", "locality", "municipality"],
    });
    return suggestions.features.map((o) => o.place_name);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { suggestedCities };
