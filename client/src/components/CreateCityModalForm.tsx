interface CreatCityModalFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
  setLat: React.Dispatch<React.SetStateAction<string>>;
  setLong: React.Dispatch<React.SetStateAction<string>>;
}

export default function CreateCityModalForm({
  handleSubmit,
  setName,
  setLat,
  setLong,
  setPicture,
}: CreatCityModalFormProps) {
  return (
    <div className='modal-box'>
      <h3 className='font-bold text-xl mb-4'>Ajouter une ville</h3>
      <hr></hr>
      <form onSubmit={handleSubmit} className='py-6 flex flex-col'>
        <label className='text-sm mb-2 font-bold' htmlFor='name'>
          Nom :
        </label>
        <input
          id='name'
          type='text'
          placeholder='Paris, Rome, Rio ...'
          className='input input-bordered bg-base-content text-base-100 w-full max-w-xs mb-4'
          onChange={(e) => setName(e.target.value)}
        />
        <label className='text-sm mb-2 font-bold' htmlFor='image'>
          Image :
        </label>
        <input
          id='image'
          type='text'
          placeholder='url : https://...'
          className='input input-bordered bg-base-content text-base-100 w-full max-w-xs mb-4'
          onChange={(e) => setPicture(e.target.value)}
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
          onChange={(e) => setLat(e.target.value)}
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
          onChange={(e) => setLong(e.target.value)}
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
