import { useState } from "react";
import { suggestedCities } from "../utils/suggestedCities";
import SuggestionList from "./SuggestionList";

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
  const onClick = (city: string) => {
    setCityName(city);
    setSuggestions([]);
  };
  const handleSuggestion = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
    setCreateCityState((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
    if (!e.target.value) {
      setSuggestions([]);
      return;
    }
    const result = await suggestedCities(e.target.value);
    setSuggestions(result);
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
            className='input bg-base-content text-base-100 w-full'
            onChange={(e) => handleSuggestion(e)}
            list='suggestions'
          />
          <SuggestionList suggestions={suggestions} onClick={onClick} />
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
