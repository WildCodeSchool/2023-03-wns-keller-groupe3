import { Category } from "../graphql/__generated__/graphql";

interface CreatePoiFormProps {
  allCategories?: Category[];
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAdress: React.Dispatch<React.SetStateAction<string>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function CreatePoiModalForm({
  allCategories,
  setName,
  setAdress,
  setCategories,
  setDescription,
  setPicture,
  setShowModal,
  showModal,
  handleSubmit,
}: CreatePoiFormProps) {
  return (
    <form
      className='modal opacity-100 pointer-events-auto w-full'
      onSubmit={handleSubmit}
    >
      <div className='modal-box z-1 flex flex-col gap-y-2'>
        <p className='font-bold text-xl'>Ajouter un Point d'interêt</p>
        <hr></hr>
        <input
          type='text'
          placeholder='Nom'
          className='input input-bordered mt-4 mb-4 bg-base-content text-base-100'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id='address'
          type='text'
          placeholder='Adresse'
          className='input input-bordered mb-4 bg-base-content text-base-100'
          onChange={(e) => setAdress(e.target.value)}
        />
        <select
          id='category'
          className='select select-bordered w-full mb-4 bg-base-content text-base-100'
          multiple
          onChange={(e) => {
            setCategories(
              Array.from(e.target.selectedOptions).map((element) => ({
                id: element.value,
                name: element.label,
              }))
            );
          }}
        >
          <option className='text-lg' value='disabled' disabled selected>
            Sélectionner une ou plusieurs catégories
          </option>
          {allCategories?.map((category) => (
            <option
              className='text-lg'
              label={category.name}
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
        <textarea
          id='description'
          rows={3}
          className='textarea textarea-bordered mb-4 bg-base-content text-base-100 placeholder:text-base text-base'
          placeholder='Description'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          id='picture'
          type='text'
          placeholder='Image'
          className='input input-bordered mb-4 bg-base-content text-base-100'
          onChange={(e) => setPicture(e.target.value)}
        />
        <div className='flex justify-between mt-4'>
          <button onClick={() => setShowModal(!showModal)} className='btn'>
            Annuler
          </button>
          <button className='btn btn-primary' type='submit'>
            Valider
          </button>
        </div>
      </div>
    </form>
  );
}
