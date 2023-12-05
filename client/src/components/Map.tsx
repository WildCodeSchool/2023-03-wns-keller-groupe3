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
import CustomToast from "./CustomToast";
import { toast } from "react-toastify";
import CreatePoiModalForm from "./CreatePoiModalForm";
import { Category, Poi } from "../graphql/__generated__/graphql";
import PoiCard from "./PoiCard";
import { getAddressByLatAndLong } from "../functions/getAddressByLatAndLong";
import { marker } from "../utils/marker";
import useGetUser from "../graphql/hook/useGetUser";
import { Role } from "../utils/RoleEnum";
import { useParams } from "react-router-dom";
import checkIfPositionIsInCity from "../scripts/checkIfPositionIsInCity";

interface MapProps {
  id: string;
  lat: number;
  long: number;
  allPoi: Poi[];
}

export default function Map({ id, lat, long, allPoi }: MapProps) {
  const { userRole, superUsercityId } = useGetUser();
  const isSuperAdmin = userRole === Role.SUPERADMIN;
  const isSuperUser = userRole === Role.SUPERUSER && id === superUsercityId;
  const [showModal, setShowModal] = useState(false);
  const [clickedLat, setClikedLat] = useState(lat);
  const [clickedLong, setClikedLong] = useState(long);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const { data } = useQuery(GET_CATEGORIES);
  const allCategories = data?.getAllCategories;
  const [createPoi] = useMutation(ADD_POI);
  const OpenModalWithPosition = () => {
    useMapEvents({
      dblclick: (e) => {
        if (isSuperAdmin || isSuperUser) {
          if (!checkIfPositionIsInCity(lat, long, e.latlng.lat, e.latlng.lng)) {
            toast(
              <CustomToast
                message={"Le point d'intêret est en dehors de la ville"}
                color='text-error'
              />
            );
            setClikedLat(lat);
            setClikedLong(long);
            setShowModal(false);
          } else {
            setShowModal(!showModal);
          }
        }
      },
    });
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addressByPostion = await getAddressByLatAndLong([
      clickedLong,
      clickedLat,
    ]);
    createPoi({
      variables: {
        name,
        address: addressByPostion!,
        description,
        picture,
        categories: categories,
        latitude: clickedLat,
        longitude: clickedLong,
        city: { id, latitude: lat, longitude: long },
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
                <Marker icon={marker} position={[poi.latitude, poi.longitude]}>
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
