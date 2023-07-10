import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

export const GET_CITIES = gql`
  query Query {
    getAllCities {
      id
      name
      picture
    }
  }
`;

function City() {
  const { loading, error, data } = useQuery(GET_CITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <section className='container max-w-5xl md:mx-auto p-5 flex flex-col gap-6'>
      <label
        htmlFor='my_modal_6'
        className='fixed bottom-5 right-5 btn btn-primary'
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
            d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        Ville
      </label>
      <h1 className='text-2xl font-bold '>Choisissez votre ville</h1>
      <div className='border border-primary rounded-full flex gap-2 p-2'>
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
      <ul className='container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data.getAllCities.map((city: any) => (
          <Link key={city.id} to={`/city/${city.id}`}>
            <div className='card bg-base-100 shadow-xl'>
              <figure className='h-32'>
                <img src={city.picture} alt='City' />
              </figure>
              <div className='card-body'>
                <p className='card-title text-base font-normal'>{city.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
      <input type='checkbox' id='my_modal_6' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Ajoutez une ville</h3>
          <div className='flex flex-col justify-center mt-5'>
            <input
              type='text'
              placeholder='Nom de la ville'
              className='input input-bordered w-full max-w-xs mt-5'
            />
            <input
              type='text'
              placeholder='Photo de la ville'
              className='input input-bordered w-full max-w-xs mt-5'
            />
            <div className='flex'>
              <input
                type='text'
                placeholder='Latitude'
                className='input input-bordered w-full max-w-xs mt-5 mr-2'
              />
              <input
                type='text'
                placeholder='Longitude'
                className='input input-bordered w-full max-w-xs mt-5 ml-2'
              />
            </div>
          </div>
          <div className='modal-action flex justify-between mt-10'>
            <label htmlFor='my_modal_6' className='btn'>
              annuler
            </label>
            <label htmlFor='my_modal_6' className='btn btn-primary'>
              valider
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default City;
