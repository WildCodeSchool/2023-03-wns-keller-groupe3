import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CityCard, City } from "../components/CityCard";
import { ADD_CITY } from "../graphql/mutations";
import { GET_CITIES } from "../graphql/queries";
import { toast } from "react-toastify";
import CustomToast from "../utils/CustomToast";
import backgroundCity from "../assets/cityBackground.png";

export default function Cities() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [searchText, setSearchText] = useState("");
  const { loading, error, data } = useQuery(GET_CITIES);
  const [createCity] = useMutation(ADD_CITY);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCity({
      variables: {
        name,
        picture,
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
      },
      onCompleted({ createCity }) {
        toast(
          <CustomToast
            message={`La ville de "${createCity.name}" a été ajouté`}
            color='text-success'
          />
        );
        navigate(`/city/${createCity.id}`);
      },
      onError(error) {
        toast(<CustomToast message={error.message} color='text-error' />);
      },
      refetchQueries: [GET_CITIES],
    });
  };

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center'>Error : {error.message}</p>;

  const filteredCities = data?.getAllCities.filter((city: City) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section
      className='min-h-screen bg-base-content'
      style={{
        backgroundImage: `url(${backgroundCity})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className='flex flex-col w-11/12 mx-auto pt-5 md:w-3/5'>
        <h1 className='text-2xl text-base-100 font-bold py-5'>
          Choisissez votre ville
        </h1>
        <div className='flex items-center'>
          <input
            className='input input-bordered bg-base-content text-accent-content w-full'
            placeholder='Recherche'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <label htmlFor='my_modal_6' className='btn btn-primary ml-5'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            </div>
          </label>
        </div>
      </div>
      <div className='pt-5 pb-16 flex flex-wrap justify-center md:max-w-xl lg:max-w-3xl xl:max-w-5xl mx-auto'>
        {filteredCities?.map((city: City) => (
          <Link
            key={city.id}
            to={`/city/${city.id}`}
            className='m-4 w-80 md:w-48'
          >
            <CityCard city={city} />
          </Link>
        ))}
      </div>
      <input type='checkbox' id='my_modal_6' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-xl mb-4'>Ajouter une ville</h3>
          <hr></hr>
          <form onSubmit={handleSubmit} className='py-6 flex flex-col'>
            <label className='text-sm mb-2 font-bold' htmlFor='name'>
              Nom :
            </label>
            <input
              id='name'
              type='text'
              placeholder='Paris, Rome, Rio ...'
              className='input input-bordered bg-base-content text-base-100 w-full max-w-xs mb-4'
              onChange={(e) => setName(e.target.value)}
            />
            <label className='text-sm mb-2 font-bold' htmlFor='image'>
              Image :
            </label>
            <input
              id='image'
              type='text'
              placeholder='url : https://...'
              className='input input-bordered bg-base-content text-base-100 w-full max-w-xs mb-4'
              onChange={(e) => setPicture(e.target.value)}
            />
            <label className='text-sm mb-2 font-bold' htmlFor='latitude'>
              Latitude :
            </label>
            <input
              id='latitude'
              type='number'
              step='0.0001'
              min={-90}
              max={90}
              placeholder='43.2345'
              className='input input-bordered bg-base-content text-base-100 w-full max-w-xs mb-4'
              onChange={(e) => setLat(e.target.value)}
            />
            <label className='text-sm mb-2 font-bold' htmlFor='longitude'>
              Longitude :
            </label>
            <input
              id='longitude'
              type='number'
              step='0.0001'
              min={-180}
              max={180}
              placeholder='2.5456'
              className='input input-bordered bg-base-content text-base-100 w-full max-w-xs'
              onChange={(e) => setLong(e.target.value)}
            />
            <div className='modal-action flex justify-between'>
              <label htmlFor='my_modal_6' className='btn'>
                Annuler
              </label>
              <input
                id='submit'
                type='submit'
                className='btn btn-primary'
                value='valider'
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
