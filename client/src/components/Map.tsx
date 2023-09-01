import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POI } from "../graphql/mutations";
import { GET_CATEGORIES, GET_ONE_CITY } from "../graphql/queries";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import CustomToast from "../utils/CustomToast";
import { toast } from "react-toastify";
import CreatePoiModalForm from "./CreatePoiModalForm";
import { Category, Poi } from "../graphql/__generated__/graphql";
import PoiCard from "./PoiCard";

interface MapProps {
  id: string;
  lat: number;
  long: number;
  allPoi: Poi[];
}

export default function Map({ id, lat, long, allPoi }: MapProps) {
  const [showModal, setShowModal] = useState(false);
  const [clickedLat, setClikedLat] = useState(lat);
  const [clickedLong, setClikedLong] = useState(long);
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const { data } = useQuery(GET_CATEGORIES);
  const allCategories = data?.getAllCategories;
  const [createPoi] = useMutation(ADD_POI);
  const OpenModalWithPosition = () => {
    useMapEvents({
      dblclick: (e) => {
        setClikedLat(e.latlng.lat);
        setClikedLong(e.latlng.lng);
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
        city: { id },
        gpsPin: "Default",
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
      refetchQueries: [GET_ONE_CITY],
      onError(error) {
        toast(<CustomToast message={error.message} color='text-error' />);
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
          {allPoi.map((poi) => {
            return (
              <div key={poi.id}>
                <Marker position={[poi.latitude, poi.longitude]}>
                  <Popup>
                    <PoiCard poi={poi} />
                  </Popup>
                </Marker>
              </div>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}
