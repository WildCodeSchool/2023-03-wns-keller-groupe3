import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CityCard } from "../components/CityCard";
import backgroundCity from "../assets/cityBackground.png";
import useGetCities from "../graphql/hook/useGetCities";
import useCreateCity from "../graphql/hook/useCreateCity";
import CreateCityModalForm from "../components/CreateCityModalForm";

export default function Cities() {
  const [createCityState, setCreateCityState] = useState({
    name: "",
    picture: "",
    lat: "",
    long: "",
  });
  const [searchText, setSearchText] = useState("");
  const { cities, loading, error } = useGetCities();
  const { createCity } = useCreateCity();
  const createCitySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCity({
      variables: {
        name: createCityState.name,
        picture: createCityState.picture,
        latitude: parseFloat(createCityState.lat),
        longitude: parseFloat(createCityState.long),
      },
    });
  };
  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center'>Error : {error.message}</p>;
  const filteredCities = cities.filter((city) =>
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
        {filteredCities.map((city) => (
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
        <CreateCityModalForm
          setCreateCityState={setCreateCityState}
          createCitySubmit={createCitySubmit}
        />
      </div>
    </section>
  );
}
