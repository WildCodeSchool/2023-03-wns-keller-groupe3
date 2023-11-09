import L from "leaflet";

const marker = new L.Icon({
  iconUrl: require("../assets/pingps.png"),
  iconRetinaUrl: require("../assets/pingps.png"),
  iconSize: new L.Point(32, 32),
  className: "leaflet-div-icon",
});

export { marker };
