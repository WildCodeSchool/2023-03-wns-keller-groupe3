import { useState } from "react";
import { suggestedCities } from "../functions/suggestedCities";
import AutoComplete from "./AutoComplete";

interface CreatCityModalFormProps {
  createCitySubmit: React.FormEventHandler<HTMLFormElement>;
  setCityName: React.Dispatch<React.SetStateAction<string>>;
  cityName: string;
}

export default function CreateCityModalForm({
  createCitySubmit,
  setCityName,
  cityName,
}: CreatCityModalFormProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSuggestions = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setSuggestions([]);
      return;
    }
    const result = await suggestedCities(e.target.value.trim());
    setSuggestions(result);
  };

  const onClick = (selectedCity: string) => {
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
