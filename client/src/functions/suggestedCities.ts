import * as maptilerClient from "@maptiler/client";
maptilerClient.config.apiKey = process.env.REACT_APP_MAP_TILER_KEY!;

async function suggestedCities(cityName: string) {
  if (!cityName) return [];
  try {
    const suggestions = await maptilerClient.geocoding.forward(cityName, {
      types: ["municipality"],
      limit: 5,
      language: ["fr"],
    });
    return suggestions.features.map((o) => o.place_name);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { suggestedCities };
