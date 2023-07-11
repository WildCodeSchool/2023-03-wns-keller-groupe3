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
    <div className="card CardShadowHover h-full border-b-[6px] border-primary bg-base-100 shadow-xl">
      <figure className="h-32">
        <img className="w-full h-full" src={city.picture} alt="City" />
      </figure>
      <div className="card-body border-t-2 border-primary">
        <h2 className="card-title text-primary">{city.name}</h2>
      </div>
    </div>
  );
}
