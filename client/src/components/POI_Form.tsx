import { useState } from "react";
import { gql, useMutation, useQuery} from "@apollo/client";

const ADD_POI = gql(`
    mutation AddPOI(
        $address: String!,
        $categories: [CategoryInput!]!,
        $description: String!,
        $gpsPin: String!,
        $name: String!,
        $picture: String!,
        $rating: Float!,
        $city: CityInput!,
        $latitude: Float!
        $longitude: Float!,
        ) {
        createPOI(
            address: $address,
            categories: $categories,
            description: $description,
            gpsPin: $gpsPin,
            name: $name,
            picture: $picture,
            rating: $rating,
            city: $city,
            latitude: $latitude
            longitude: $longitude,
            ) {
        id
        name
        }
    }
`)

export const GET_CATEGORIES = gql(`
    query GetAllSkills {
        getAllCategories {
            id
            name
        }
    }
`)

export default function AddPOIForm(city: any, lat: number, lng: number) {
    const [address, setAddress] = useState('')
    const [categories, setCategories] = useState([''])
    const [description, setDescription] = useState('')
    const [gpsPin, setGpsPin] = useState('default')
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')
    const [rating, setRating] = useState(5)

    const [AddNewPoi]  = useMutation(ADD_POI)
    const { data, error, loading } = useQuery(GET_CATEGORIES);
    const allCategories = data?.getAllCategories;

    if (loading) {
        return <p>Loading</p>;
    }
    if (error) {
        console.log("error is : ", error);
        return <p>Error</p>;
    }
    return (
        <form
            className='py-6 flex flex-col'
            onSubmit={async (e) => {
                e.preventDefault();
                AddNewPoi({ variables: { 
                    address,
                    "categories": {"id": categories[0]},
                    description,
                    gpsPin,
                    name,
                    picture,
                    rating,
                    city: {"id": city.city},
                    latitude: lat,
                    longitude: lng,
                } });
            }}
        >
            <label className='text-sm mb-2 font-bold' htmlFor='name'>
                Nom
            </label>
            <input
                className='input input-bordered w-full max-w-xs mb-4'
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />

            <label className='text-sm mb-2 font-bold' htmlFor='address'>
                Adresse :
            </label>
            <input
                id='address'
                type='text'
                placeholder='99 rue de la République'
                className='input input-bordered w-full max-w-xs mb-4'
                value={address}
                onChange={(e) => {
                    setAddress(e.target.value);
                }}
            />
            
            <label className='text-sm mb-2 font-bold' htmlFor='categories'>
                Catégorie(s)
            </label>
            <select
                id='categories'
                className="select select-bordered w-full max-w-xs"
                multiple
                onChange={(e) => {
                    setCategories(
                        Array.from(e.target.selectedOptions).map((el) => el.value)
                    );
                }}
            >
                <option value="disabled" disabled selected>
                    Sélectionner une ou plusieurs catégories
                </option>
                {allCategories.map((category: any) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
            </select>
            
            <label className='text-sm mb-2 font-bold' htmlFor='description'>
                Description
            </label>
            <textarea
                id='description'
                className="textarea textarea-bordered w-full max-w-xs mb-4"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            
            <label className='text-sm mb-2 font-bold' htmlFor='gpsPin'>
                Marqueur
            </label>
            <input
                className='input input-bordered w-full max-w-xs mb-4'
                value={gpsPin}
                onChange={(e) => {
                    setGpsPin(e.target.value);
                }}
            />
            
            <label className='text-sm mb-2 font-bold' htmlFor='rating'>
                Note
            </label>
            <input
                type='number'
                min='0'
                max='5'
                className='input input-bordered w-full max-w-xs mb-4'
                value={rating}
                onChange={(e) => {
                    setRating(parseInt(e.target.value));
                }}
            />

            <label className='text-sm mb-2 font-bold' htmlFor='picture'>
                Image (url)
            </label>
            <input
                className='input input-bordered w-full max-w-xs mb-4'
                value={picture}
                onChange={(e) => {
                    setPicture(e.target.value);
                }}
            />
            
            <button className="btn btn-pimary">Submit</button>
        </form>
    )
}
