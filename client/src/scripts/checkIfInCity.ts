const checkIfPositionIsInCity = (
  cityLat: number,
  cityLong: number,
  poiLat: number,
  poiLong: number
) => {
  if (
    cityLat + 0.05 > poiLat &&
    cityLat - 0.05 < poiLat &&
    cityLong + 0.05 > poiLong &&
    cityLong - 0.05 < poiLong
  ) {
    return true;
  }

  return false;
};

export default checkIfPositionIsInCity;
