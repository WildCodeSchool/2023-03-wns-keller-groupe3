import { City } from "../graphql/__generated__/graphql";

interface CityCardProps {
  city: Partial<City>;
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
      <div className='card-body justify-center border-t-2 border-primary'>
        <p className='text-lg text-base-content md:h-8 break-words'>
          {city.name}
        </p>
      </div>
    </div>
  );
}
