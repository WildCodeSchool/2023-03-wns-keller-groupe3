import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export interface Category {
  id: number;
  name: string;
}

export interface POI {
  name: string;
  categories: Category[];
  description: string;
  latitude: number;
  longitude: number;
  picture: string;
  address: string;
  rating: number;
}

interface MapProps {
  id: string;
  lat: number;
  long: number;
  poi: POI[];
}

export default function Map({ id, lat, long, poi }: MapProps) {
  return (
    <div id="map">
      <MapContainer
        id={id}
        center={[lat, long]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {poi.map((p) => {
          return (
            <Marker position={[p.latitude, p.longitude]}>
              <Popup>
                <div>
                  <div className="">
                    <div className="w-full h-[150px]">
                      <img
                        className="w-full h-full rounded-t-2xl"
                        src={p.picture}
                        alt="poi_image"
                      />
                    </div>
                  </div>
                  <div className="px-[20px] pb-[25px] overflow-hidden relative">
                    <div className="leafletLine"></div>
                    <div className="h-[305px] flex flex-col justify-between">
                      <div>
                        <div className="py-[15px]">
                          <h1 className="text-xl font-bold">{p.name}</h1>
                        </div>
                        <div>
                          <div className="pb-2 flex gap-1">
                            {p.categories.map((category) => {
                              return (
                                <span className="badge badge-outline">
                                  {category.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex border-y border-[#1B2F02]">
                          <div className="flex-1 text-center py-2.5 hover:bg-[#1B2F021A] border-r border-[#1B2F02]">
                            <a href="">Présentation</a>
                          </div>
                          <div className="flex-1 text-center py-2.5 hover:bg-[#1B2F021A]">
                            <a href="">Avis</a>
                          </div>
                        </div>
                        <div className="flex py-3 border-b border-[#1B2F02]">
                          <div className="w-4/5">
                            <p className="!m-0">{p.address}</p>
                          </div>
                          <div className="w-1/5 flex justify-end items-end">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="py-[25px]">
                          <p className="">{p.description}</p>
                        </div>
                      </div>
                      {/* HERE operator to add up all comments  */}
                      <div className="flex items-center">
                        <p className="!mr-2">Note:{p.rating}</p>
                        {[...Array(p.rating)].map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        ))}
                        <span className="ml-1">(150)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
