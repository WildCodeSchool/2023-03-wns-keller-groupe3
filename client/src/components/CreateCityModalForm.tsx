interface CreatCityModalFormProps {
  createCitySubmit: React.FormEventHandler<HTMLFormElement>;
  setCreateCityState: React.Dispatch<
    React.SetStateAction<{
      name: string;
      picture: string;
      lat: string;
      long: string;
    }>
  >;
}

export default function CreateCityModalForm({
  createCitySubmit,
  setCreateCityState,
}: CreatCityModalFormProps) {
  return (
    <div className='modal-box'>
      <h3 className='font-bold text-xl mb-4'>Ajouter une ville</h3>
      <hr></hr>
      <form onSubmit={createCitySubmit} className='py-6 flex flex-col'>
        <label className='text-sm mb-2 font-bold' htmlFor='name'>
          Nom :
        </label>
        <input
          id='name'
          type='text'
          placeholder='Paris, Rome, Rio ...'
          className='input input-bordered bg-base-content text-base-100 w-full max-w-xs mb-4'
          onChange={(e) =>
            setCreateCityState((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <label className='text-sm mb-2 font-bold' htmlFor='image'>
          Image :
        </label>
        <input
          id='image'
          type='text'
          placeholder='url : https://...'
          className='input input-bordered bg-base-content text-base-100 w-full max-w-xs mb-4'
          onChange={(e) =>
            setCreateCityState((prevState) => ({
              ...prevState,
              picture: e.target.value,
            }))
          }
        />
        <label className='text-sm mb-2 font-bold' htmlFor='latitude'>
          Latitude :
        </label>
        <input
          id='latitude'
          type='number'
          step='0.0001'
          min={-90}
          max={90}
          placeholder='43.2345'
          className='input input-bordered bg-base-content text-base-100 w-full max-w-xs mb-4'
          onChange={(e) =>
            setCreateCityState((prevState) => ({
              ...prevState,
              lat: e.target.value,
            }))
          }
        />
        <label className='text-sm mb-2 font-bold' htmlFor='longitude'>
          Longitude :
        </label>
        <input
          id='longitude'
          type='number'
          step='0.0001'
          min={-180}
          max={180}
          placeholder='2.5456'
          className='input input-bordered bg-base-content text-base-100 w-full max-w-xs'
          onChange={(e) =>
            setCreateCityState((prevState) => ({
              ...prevState,
              long: e.target.value,
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
