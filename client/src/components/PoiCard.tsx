import { Poi } from "../graphql/__generated__/graphql";

interface PoiCardProps {
  poi: Poi;
}

export default function PoiCard({ poi }: PoiCardProps) {
  return (
    <>
      <div className="">
        <div className="w-full h-[150px]">
          <img
            className="w-full h-full rounded-t-2xl"
            src={poi.picture}
            alt="poi_image"
          />
        </div>
      </div>
      <div className="px-[20px] pb-[25px] overflow-hidden relative">
        <div className="leafletLine"></div>
        <div className="h-[305px] flex flex-col justify-between">
          <div>
            <div className="py-[15px]">
              <h1 className="text-xl font-bold text-white">{poi.name}</h1>
            </div>
            <div>
              <div className="pb-2 flex gap-1 text-white">
                {poi.categories.map((category) => {
                  return (
                    <span key={category.id} className="badge badge-outline">
                      {category.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex border-y border-primary text-white">
              <div className="flex-1 text-center py-2.5  hover:bg-[#ed998621] border-r border-primary">
                <p>Présentation</p>
              </div>
              <div className="flex-1 text-center py-2.5 hover:bg-[#ed998621]">
                <p>Avis</p>
              </div>
            </div>
            <div className="flex py-3 border-b border-primary">
              <div className="w-4/5">
                <p className="!m-0 text-white">{poi.address}</p>
              </div>
              <div className="w-1/5 flex justify-end items-end">
                <svg
                  width="18"
                  height="22"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9.143C1 4.646 4.582 1 9 1C13.418 1 17 4.646 17 9.143C17 13.605 14.447 18.813 10.463 20.674C10.0051 20.8884 9.50563 20.9996 9 20.9996C8.49437 20.9996 7.99492 20.8884 7.537 20.674C3.553 18.812 1 13.605 1 9.144V9.143Z"
                    stroke="#ED9986"
                    stroke-width="1.5"
                  />
                  <path
                    d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
                    stroke="#ED9986"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
            </div>
            <div className="py-2.5 my-2.5 h-[85px] overflow-y-auto pr-2 mr-1.5">
              <p className="text-white">{poi.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
