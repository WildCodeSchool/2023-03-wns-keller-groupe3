import { useState } from "react";
import { suggestedCities } from "../functions/suggestedCities";
import AutoComplete from "./AutoComplete";

interface CreatCityModalFormProps {
  createCitySubmit: React.FormEventHandler<HTMLFormElement>;
  setCreateCityState: React.Dispatch<
    React.SetStateAction<{
      name: string;
      picture: string;
    }>
  >;
}

export default function CreateCityModalForm({
  createCitySubmit,
  setCreateCityState,
}: CreatCityModalFormProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cityName, setCityName] = useState("");

  const handleSuggestions = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cityName = e.target.value;
    setCityName(cityName);
    if (!cityName) {
      setSuggestions([]);
      return;
    }
    const result = await suggestedCities(cityName.trim());
    setSuggestions(result);
  };

  const onClick = (selectedCity: string) => {
    setCreateCityState((prevState) => ({
      ...prevState,
      name: selectedCity,
    }));
    setCityName(selectedCity);
    setSuggestions([]);
  };

  return (
    <div className='modal-box'>
      <h3 className='font-bold text-xl mb-4'>Ajouter une ville</h3>
      <hr></hr>
      <form onSubmit={createCitySubmit} className='py-6 flex flex-col'>
        <label className='text-sm mb-2 font-bold' htmlFor='name'>
          Nom :
        </label>
        <div className='relative mb-4'>
          <input
            value={cityName}
            id='name'
            type='text'
            placeholder='Paris, Rome, Rio ...'
            className={
              suggestions.length
                ? "input bg-base-content text-base-100 w-full rounded-b-none"
                : "input bg-base-content text-base-100 w-full"
            }
            onChange={(e) => handleSuggestions(e)}
          />
          <AutoComplete data={suggestions} onClick={onClick} />
        </div>
        <label className='text-sm mb-2 font-bold' htmlFor='image'>
          Image :
        </label>
        <input
          id='image'
          type='text'
          placeholder='url : https://...'
          className='input input-bordered bg-base-content text-base-100 w-full mb-4'
          onChange={(e) =>
            setCreateCityState((prevState) => ({
              ...prevState,
              picture: e.target.value,
            }))
          }
        />
        <div className='modal-action flex justify-between'>
          <label htmlFor='my_modal_6' className='btn'>
            Annuler
          </label>
          <input
            id='submit'
            type='submit'
            className='btn btn-primary'
            value='valider'
          />
        </div>
      </form>
    </div>
  );
}
