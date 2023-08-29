import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POI } from "../graphql/mutations";
import { GET_CATEGORIES } from "../graphql/queries";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import CustomToast from "../utils/CustomToast";
import { toast } from "react-toastify";
import CreatePoiModalForm, { Category } from "./CreatePoiModalForm";

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
  const [showModal, setShowModal] = useState(false);
  const [clickedLat, setClikedLat] = useState<number>();
  const [clickedLong, setClikedLong] = useState<number>();
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");
  const [categories, setCategories] = useState([{}]);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const { data } = useQuery(GET_CATEGORIES);
  const allCategories = data?.getAllCategories;
  const [createPoi] = useMutation(ADD_POI);
  const OpenModalWithPosition = () => {
    useMapEvents({
      dblclick: (e) => {
        setClikedLat(e?.latlng?.lat);
        setClikedLong(e?.latlng?.lng);
        setShowModal(!showModal);
      },
    });
    return null;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPoi({
      variables: {
        name,
        address,
        description,
        picture,
        categories: categories,
        latitude: clickedLat,
        longitude: clickedLong,
        city: { id: id },
        gpsPin: "Default",
        rating: 5,
      },
      onCompleted({ createPOI }) {
        toast(
          <CustomToast
            message={`"${createPOI.name}" a été ajouté`}
            color='text-success'
          />
        );
        setShowModal(!showModal);
      },
    });
  };
  return (
    <>
      {showModal && clickedLat && clickedLong && (
        <CreatePoiModalForm
          allCategories={allCategories}
          handleSubmit={handleSubmit}
          setAdress={setAdress}
          setDescription={setDescription}
          setCategories={setCategories}
          setName={setName}
          setPicture={setPicture}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
      <div id='map'>
        <MapContainer
          id={id}
          center={[lat, long]}
          zoom={14}
          scrollWheelZoom={true}
          doubleClickZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <OpenModalWithPosition />
          {poi.map((p, key) => {
            return (
              <Marker position={[p.latitude, p.longitude]}>
                <Popup>
                  <div key={key}>
                    <div className=''>
                      <div className='w-full h-[150px]'>
                        <img
                          className='w-full h-full rounded-t-2xl'
                          src={p.picture}
                          alt='poi_image'
                        />
                      </div>
                    </div>
                    <div className='px-[20px] pb-[25px] overflow-hidden relative'>
                      <div className='leafletLine'></div>
                      <div className='h-[305px] flex flex-col justify-between'>
                        <div>
                          <div className='py-[15px]'>
                            <h1 className='text-xl font-bold'>{p.name}</h1>
                          </div>
                          <div>
                            <div className='pb-2 flex gap-1'>
                              {p.categories.map((category) => {
                                return (
                                  <span
                                    key={category.id}
                                    className='badge badge-outline'
                                  >
                                    {category.name}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div className='flex border-y border-[#1B2F02]'>
                            <div className='flex-1 text-center py-2.5 hover:bg-[#1B2F021A] border-r border-[#1B2F02]'>
                              <p>Présentation</p>
                            </div>
                            <div className='flex-1 text-center py-2.5 hover:bg-[#1B2F021A]'>
                              <p>Avis</p>
                            </div>
                          </div>
                          <div className='flex py-3 border-b border-[#1B2F02]'>
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
                          <div className='py-[25px]'>
                            <p className=''>{p.description}</p>
                          </div>
                        </div>
                        {/* HERE operator to add up all comments  */}
                        <div className='flex items-center'>
                          <p className='!mr-2'>Note:{p.rating}</p>
                          {[...Array(p.rating)].map((_, index) => (
                            <svg
                              key={index}
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
                                d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                              />
                            </svg>
                          ))}
                          <span className='ml-1'>(150)</span>
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
    </>
  );
}
