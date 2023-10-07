import * as maptilerClient from "@maptiler/client";
maptilerClient.config.apiKey = process.env.REACT_APP_MAP_TILER_KEY!;

//  * https://docs.maptiler.com/client-js/geocoding#forward
async function getLatAndLongByCityName(cityName: string) {
  try {
    const position = await maptilerClient.geocoding.forward(cityName);
    if (position.features && position.features[0]) {
      const { center } = position.features[0];
      if (center && center.length === 2) {
        return {
          latitude: center[1],
          longitude: center[0],
        };
      }
    }
    throw new Error("Données de géolocalisation invalides.");
  } catch (error) {
    console.error(
      `Erreur lors de la recherche des coordonnées GPS pour ${cityName}:`,
      error
    );
    throw error;
  }
}

export { getLatAndLongByCityName };
