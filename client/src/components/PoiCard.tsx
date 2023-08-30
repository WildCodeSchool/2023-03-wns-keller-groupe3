import { Poi } from "../graphql/__generated__/graphql";

interface PoiCardProps {
  poi: Poi;
}

export default function PoiCard({ poi }: PoiCardProps) {
  return (
    <>
      <div className=''>
        <div className='w-full h-[150px]'>
          <img
            className='w-full h-full rounded-t-2xl'
            src={poi.picture}
            alt='poi_image'
          />
        </div>
      </div>
      <div className='px-[20px] pb-[25px] overflow-hidden relative'>
        <div className='leafletLine'></div>
        <div className='h-[305px] flex flex-col justify-between'>
          <div>
            <div className='py-[15px]'>
              <h1 className='text-xl font-bold'>{poi.name}</h1>
            </div>
            <div>
              <div className='pb-2 flex gap-1'>
                {poi.categories.map((category) => {
                  return (
                    <span key={category.id} className='badge badge-outline'>
                      {category.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className='flex border-y border-[#1B2F02]'>
              <div className='flex-1 text-center py-2.5 hover:bg-[#1B2F021A] border-r border-[#1B2F02]'>
                <p>Présentation</p>
              </div>
              <div className='flex-1 text-center py-2.5 hover:bg-[#1B2F021A]'>
                <p>Avis</p>
              </div>
            </div>
            <div className='flex py-3 border-b border-[#1B2F02]'>
              <div className='w-4/5'>
                <p className='!m-0'>{poi.address}</p>
              </div>
              <div className='w-1/5 flex justify-end items-end'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>
              </div>
            </div>
            <div className='py-[25px]'>
              <p className=''>{poi.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
