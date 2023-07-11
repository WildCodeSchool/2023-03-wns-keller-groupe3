import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { CityCard, City } from "../components/CityCard";
import backgroundCity from "../assets/cityBackground.png";

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
    <section
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${backgroundCity})` }}
    >
      <div className="container max-w-5xl md:mx-auto pt-12 px-9 pb-[6rem] md:pl-[10rem] md:pr-[6rem] flex flex-col gap-6">
        <h1 className="text-2xl font-bold ">Choisissez votre ville</h1>
        <div className="border border-grey-900 rounded-full flex gap-2 p-2 bg-white">
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
        {/* Liste de villes */}
        <ul className="container grid grid-cols-1 min-[420px]:grid-cols-2 min-[823px]:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.getAllCities.map((city: City) => (
            <Link key={city.id} to={`/city/${city.id}`}>
              <CityCard city={city} />
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Cities;
