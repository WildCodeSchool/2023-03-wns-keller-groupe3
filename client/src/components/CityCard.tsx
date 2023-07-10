export interface City {
  id: string;
  name: string;
  picture: string;
}

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="h-32">
        <img src={city.picture} alt="City" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{city.name}</h2>
      </div>
    </div>
  );
}
