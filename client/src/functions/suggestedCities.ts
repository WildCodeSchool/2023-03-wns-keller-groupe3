import * as maptilerClient from "@maptiler/client";
maptilerClient.config.apiKey = process.env.REACT_APP_MAP_TILER_KEY!;

async function suggestedCities(cityName: string) {
  if (!cityName) return [""];
  try {
    const suggestions = await maptilerClient.geocoding.forward(cityName);
    const spliceSuggestion = suggestions.features.map((o) => o.place_name);
    return spliceSuggestion.slice(0, 4);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { suggestedCities };
