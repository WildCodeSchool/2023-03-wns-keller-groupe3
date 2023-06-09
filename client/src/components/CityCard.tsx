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
    <div className='CardShadowHover max-w-sm rounded-lg border-b-[6px] border-primary bg-base-100 shadow-xl'>
      <figure className='h-48 md:h-28'>
        <img
          src={city.picture}
          className='rounded-t-lg h-full w-full'
          alt='City'
        />
      </figure>
      <div className='card-body border-t-2 border-primary'>
        <p className='card-title text-base-content md:h-8 w-auto'>
          {city.name}
        </p>
      </div>
    </div>
  );
}
