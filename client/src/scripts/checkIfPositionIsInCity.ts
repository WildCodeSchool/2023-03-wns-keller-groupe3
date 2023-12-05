const checkIfPositionIsInCity = (
  cityLat: number,
  cityLong: number,
  poiLat: number,
  poiLong: number
) => {
  const range = 0.05;
  if (
    cityLat + range > poiLat &&
    cityLat - range < poiLat &&
    cityLong + range > poiLong &&
    cityLong - range < poiLong
  ) {
    return true;
  }

  return false;
};

export default checkIfPositionIsInCity;
