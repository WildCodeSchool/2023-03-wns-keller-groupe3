import { Link } from "react-router-dom";
import { mockData } from "../utils/mockData";
import colmar from "../assets/images/colmar.jpg";

function City() {
  return (
    <section className="container max-w-5xl md:mx-auto p-5 flex flex-col gap-4">
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
      <ul className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {mockData.map((c) => (
          <Link key={c.id} to={`/city/${c.id}`}>
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src={colmar} alt="City" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{c.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default City;
