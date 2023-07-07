import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import bar from "../assets/bar.png";

interface POI {
  picture: string;
  name: string;
  address: string;
  category: string;
  description: string;
  poiLat: number;
  poiLong: number;
}

interface MapProps {
  id: string;
  lat: number;
  long: number;
  poi: POI[];
}

export default function Map({ id, lat, long, poi }: MapProps) {
  return (
    <div id='map'>
      <MapContainer
        id={id}
        center={[lat, long]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {poi.map((p) => (
          <Marker position={[p.poiLat, p.poiLong]}>
            <Popup>
              <div>
                <div className='leafletLine'></div>
                <div className='w-full h-[190px]'>
                  <img
                    className='w-full h-full rounded-t-2xl'
                    src={bar}
                    alt='test'
                  />
                </div>
                <div className='px-[20px] pb-[30px]'>
                  <div className='py-[15px]'>
                    <h1 className='text-xl font-bold'>{p.name}</h1>
                  </div>
                  <div className='flex border-y border-[#1B2F02]'>
                    <div className='flex-1 text-center py-2.5 hover:bg-[#1B2F021A] border-r border-[#1B2F02]'>
                      <a href=''>Présentation</a>
                    </div>
                    <div className='flex-1 text-center py-2.5 hover:bg-[#1B2F021A]'>
                      <a href=''>Avis</a>
                    </div>
                  </div>
                  <div className='flex py-4 border-b border-[#1B2F02]'>
                    <div className='w-4/5'>
                      <p className='!m-0'>{p.address}</p>
                    </div>
                    <div className='w-1/5 flex justify-end items-end'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                        />
                      </svg>
                    </div>
                  </div>

                  <br />
                  <span>{p.description}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
