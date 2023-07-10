import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { CityCard, City } from "../components/CityCard";

const GET_CITIES = gql`
  query Query {
    getAllCities {
      id
      name
      picture
    }
  }
`;

function Cities() {
  const { loading, error, data } = useQuery(GET_CITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <section className='container max-w-5xl md:mx-auto p-5 flex flex-col gap-6'>
      <h1 className='text-xl font-bold mt-5'>Choisissez votre ville</h1>
      <div className='border border-grey-900 rounded-full flex gap-2 p-2 bg-white'>
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
        <input className='w-full' placeholder='Recherche' />
      </div>
      <label
        htmlFor='my_modal_6'
        className='md:fixed md:top-5 right-5 btn btn-primary'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
        ajouter
      </label>
      {/* Liste de villes */}
      <ul className='container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data.getAllCities.map((city: City) => (
          <Link key={city.id} to={`/city/${city.id}`}>
            <CityCard city={city} />
          </Link>
        ))}
      </ul>
      <input type='checkbox' id='my_modal_6' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mb-4'>Ajouter une ville</h3>
          <hr></hr>
          <form
            className='py-6 flex flex-col'
            action='
          '
          >
            <label className='text-sm mb-2' htmlFor='name'>
              Nom :
            </label>
            <input
              id='name'
              type='text'
              placeholder='Paris, Rome, Rio ...'
              className='input input-bordered w-full max-w-xs mb-4'
            />
            <label className='text-sm mb-2' htmlFor='name'>
              Image :
            </label>
            <input
              type='text'
              placeholder='url : https://...'
              className='input input-bordered w-full max-w-xs mb-4'
            />
            <label className='text-sm mb-2' htmlFor='name'>
              Latitude :
            </label>
            <input
              type='text'
              placeholder='43.2345'
              className='input input-bordered w-full max-w-xs mb-4'
            />
            <label className='text-sm mb-2' htmlFor='name'>
              Longitude :
            </label>
            <input
              type='text'
              placeholder='2.5456'
              className='input input-bordered w-full max-w-xs'
            />
          </form>
          <div className='modal-action flex justify-between'>
            <label htmlFor='my_modal_6' className='btn'>
              Annuler
            </label>
            <label htmlFor='my_modal_6' className='btn btn-primary'>
              Valider
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cities;
