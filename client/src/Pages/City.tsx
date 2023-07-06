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

  console.log(data.getAllCities);

  return (
    <section className="container max-w-5xl md:mx-auto p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-bold ">Choisissez votre ville</h1>
      <div className="border border-primary rounded-full flex gap-2 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input className="w-full" placeholder="Recherche" />
      </div>
      {/* Liste de ville */}
      <ul className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.getAllCities.map((city: any) => (
          <Link key={city.id} to={`/city/${city.id}`}>
            <div className="card bg-base-100 shadow-xl">
              <figure className="h-32">
                <img src={city.picture} alt="City" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{city.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default City;
