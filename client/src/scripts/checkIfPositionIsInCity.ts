import { range } from "../utils/range";

  const checkIfPositionIsInCity = (
  cityLat: number,
  cityLong: number,
  poiLat: number,
  poiLong: number
) => {

  if (
    (cityLat + range > poiLat && cityLat - range < poiLat) 
    &&
    (cityLong + range > poiLong && cityLong - range < poiLong)
  ) {
    return true;
  }

  return false;
};

export default checkIfPositionIsInCity;
