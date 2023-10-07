import { useState } from "react";
import { Link } from "react-router-dom";
import { CityCard } from "../components/CityCard";
import backgroundCity from "../assets/cityBackground.png";
import useGetCities from "../graphql/hook/useGetCities";
import useCreateCity from "../graphql/hook/useCreateCity";
import CreateCityModalForm from "../components/CreateCityModalForm";
import { getLatAndLongByCityName } from "../functions/getLatAndLongByCityName";
import CustomToast from "../components/CustomToast";
import { toast } from "react-toastify";

export default function Cities() {
  const [createCityState, setCreateCityState] = useState({
    name: "",
    picture: "",
  });
  const [searchText, setSearchText] = useState("");
  const { cities, loading, error } = useGetCities();
  const { createCity } = useCreateCity();

  const createCitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!createCityState.name) {
      toast(
        <CustomToast
          message='Veuillez entrer un nom de ville'
          color='text-warning'
        />
      );
      return;
    }
    try {
      const position = await getLatAndLongByCityName(createCityState.name);
      createCity({
        variables: {
          name: createCityState.name,
          picture: createCityState.picture,
          latitude: position.latitude,
          longitude: position.longitude,
        },
      });
    } catch (error) {
      console.error(error);
      toast(<CustomToast message='Nom de ville invalide' color='text-error' />);
    }
  };

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center'>Error : {error.message}</p>;

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section
      className='md:ml-[96px] min-h-screen bg-base-content'
      style={{
        backgroundImage: `url(${backgroundCity})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className='flex flex-col max-w-xs min-[705px]:max-w-2xl md:max-w-[26rem] lg:max-w-[40rem] xl:max-w-[54rem] mx-auto pt-5'>
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
      <div className='pt-5 pb-16 grid min-[705px]:grid-cols-2 min-[705px]:!max-[44rem] lg:grid-cols-3 xl:grid-cols-4 justify-center md:max-w-md lg:max-w-2xl xl:max-w-4xl mx-auto'>
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
