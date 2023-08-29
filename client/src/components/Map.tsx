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
      },
      onCompleted({ createPOI }) {
        toast(
          <CustomToast
            message={`"${createPOI.name}" a été ajouté`}
            color="text-success"
          />
        );
        setShowModal(!showModal);
      },
      onError(error) {
        toast(<CustomToast message={error.message} color="text-error" />);
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
      <div id="map">
        <MapContainer
          id={id}
          center={[lat, long]}
          zoom={14}
          scrollWheelZoom={true}
          doubleClickZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <OpenModalWithPosition />
          {poi.map((p, key) => {
            return (
              <Marker position={[p.latitude, p.longitude]}>
                <Popup>
                  <div key={key}>
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
                            <h1 className="text-xl font-bold text-white">
                              {p.name}
                            </h1>
                          </div>
                          <div>
                            <div className="pb-2 flex gap-1 text-white">
                              {p.categories.map((category) => {
                                return (
                                  <span
                                    key={category.id}
                                    className="badge badge-outline"
                                  >
                                    {category.name}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex border-y border-primary text-white">
                            <div className="flex-1 text-center py-2.5 hover:bg-[#ed998621] border-r border-primary">
                              <p>Présentation</p>
                            </div>
                            <div className="flex-1 text-center py-2.5 hover:bg-[#ed998621]">
                              <p>Avis</p>
                            </div>
                          </div>
                          <div className="flex py-3 border-b border-primary">
                            <div className="w-4/5">
                              <p className="!m-0 text-white">{p.address}</p>
                            </div>
                            <div className="w-1/5 flex justify-end items-end">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 10.143C4 5.646 7.582 2 12 2C16.418 2 20 5.646 20 10.143C20 14.605 17.447 19.813 13.463 21.674C13.0051 21.8884 12.5056 21.9996 12 21.9996C11.4944 21.9996 10.9949 21.8884 10.537 21.674C6.553 19.812 4 14.605 4 10.144V10.143Z"
                                  stroke="#ED9986"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                  stroke="#ED9986"
                                  stroke-width="1.5"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="py-[25px]">
                            <p className="text-white">{p.description}</p>
                          </div>
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
