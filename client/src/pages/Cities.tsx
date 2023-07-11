import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CityCard, City } from "../components/CityCard";
import { ADD_CITY } from "../graphql/mutations";
import { GET_CITIES } from "../graphql/queries";
import CustomToast from "../utils/CustomToast";
import backgroundCity from "../assets/cityBackground.png";
import { toast } from "react-toastify";

function Cities() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
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
  const [searchText, setSearchText] = useState("");

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center'>Error : {error.message}</p>;

  const filteredCities = data.getAllCities.filter((city: City) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section
      className='min-h-screen'
      style={{ backgroundImage: `url(${backgroundCity})` }}
    >
      <div className='container max-w-5xl md:mx-auto pt-12 px-9 pb-[6rem] md:pl-[10rem] md:pr-[6rem] flex flex-col gap-6'>
        <h1 className='text-2xl text-primary font-bold '>
          Choisissez votre ville
        </h1>
        <div className='border shadow-md border-grey-900 rounded-full flex gap-2 p-2 bg-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          <input
            className='w-full px-2'
            placeholder='Recherche'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <label
          htmlFor='my_modal_6'
          className='btn btn-primary md:w-2/6 lg:w-1/6'
        >
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
            <p className='ml-2'>ajouter</p>
          </div>
        </label>
        <ul className='grid grid-cols-1 min-[520px]:grid-cols-2 min-[823px]:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto md:mx-0'>
          {filteredCities.map((city: City) => (
            <Link key={city.id} to={`/city/${city.id}`}>
              <CityCard city={city} />
            </Link>
          ))}
        </ul>
      </div>
      <input type='checkbox' id='my_modal_6' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mb-4'>Ajouter une ville</h3>
          <hr></hr>
          <form onSubmit={handleSubmit} className='py-6 flex flex-col'>
            <label className='text-sm mb-2 font-bold' htmlFor='name'>
              Nom :
            </label>
            <input
              id='name'
              type='text'
              placeholder='Paris, Rome, Rio ...'
              className='input input-bordered w-full max-w-xs mb-4'
              onChange={(e) => setName(e.target.value)}
            />
            <label className='text-sm mb-2 font-bold' htmlFor='image'>
              Image :
            </label>
            <input
              id='image'
              type='text'
              placeholder='url : https://...'
              className='input input-bordered w-full max-w-xs mb-4'
              onChange={(e) => setPicture(e.target.value)}
            />
            <label className='text-sm mb-2 font-bold' htmlFor='latitude'>
              Latitude :
            </label>
            <input
              id='latitude'
              type='number'
              step='0.0001'
              //todo à gérer côté server
              min={-90}
              max={90}
              placeholder='43.2345'
              className='input input-bordered w-full max-w-xs mb-4'
              onChange={(e) => setLat(e.target.value)}
            />
            <label className='text-sm mb-2 font-bold' htmlFor='longitude'>
              Longitude :
            </label>
            <input
              id='longitude'
              type='number'
              step='0.0001'
              //todo à gérer côté server
              min={-180}
              max={180}
              placeholder='2.5456'
              className='input input-bordered w-full max-w-xs'
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

export default Cities;
