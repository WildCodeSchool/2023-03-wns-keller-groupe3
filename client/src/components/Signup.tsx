import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USER } from "../graphql/queries";
import { CREATE_USER } from "../graphql/mutations";
import { toast } from "react-toastify";
import CustomToast from "../utils/CustomToast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordDescription, setShowPasswordDescription] = useState(false);
  const navigate = useNavigate();
  const [addUser] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USER],
  });
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handleTogglePasswordDescription = () => {
    setShowPasswordDescription(!showPasswordDescription);
  };

  const handleSubmit = async () => {
    if (name.trim() === "") {
      toast(
        <CustomToast message={`Veuillez ajoutez un nom`} color='text-error' />
      );
    } else if (!emailRegex.test(email)) {
      console.log("email", email);
      toast(
        <CustomToast
          message={`Votre email n'est pas valide`}
          color='text-error'
        />
      );
    } else if (email !== confirmEmail) {
      toast(
        <CustomToast
          message={`Les adresses email ne correspondent pas`}
          color='text-error'
        />
      );
    } else if (!passwordRegex.test(password)) {
      toast(
        <CustomToast
          message={`Votre mot de passe n'est pas valide`}
          color='text-error'
        />
      );
    } else if (password !== confirmPassword) {
      toast(
        <CustomToast
          message={`Les mots de passe ne correspondent pas`}
          color='text-error'
        />
      );
    } else {
      try {
        await addUser({ variables: { email, name, password } });
        navigate("/user");
        toast(
          <CustomToast
            message={`Bienvenue ${name}, veuillez vous identifier pour profiter pleinement des fonctionnalités`}
            color='text-success'
          />
        );
      } catch (error) {
        console.log(error);
        toast(
          <CustomToast
            message={`Une erreur s'est produite lors de l'inscription. Veuillez réessayer.`}
            color='text-error'
          />
        );
      }
    }
  };

  return (
    <>
      <h2 className='text-6xl text-base-content font-bold mb-10 text'>
        Inscription
      </h2>
      <div className='mb-4'>
        <label
          className='block text-base-content text-sm font-bold mb-2'
          htmlFor='name'
        >
          Nom
        </label>
        <input
          className='input input-bordered w-full bg-base-content text-base-100'
          type='text'
          id='name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder='Entrez votre nom'
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-base-content text-sm font-bold mb-2'
          htmlFor='email'
        >
          Email
        </label>
        <input
          className='input input-bordered w-full bg-base-content text-base-100'
          type='email'
          id='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder='Entrez votre email'
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-base-content text-sm font-bold mb-2'
          htmlFor='email'
        >
          Confirmer votre email
        </label>
        <input
          className='input input-bordered w-full bg-base-content text-base-100'
          type='email'
          id='confirmEmail'
          value={confirmEmail}
          onChange={(e) => {
            setConfirmEmail(e.target.value);
          }}
          placeholder='Confirmez votre email'
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-base-content text-sm font-bold mb-2'
          htmlFor='password'
        >
          Mot de passe{" "}
          <span
            className='text-primary text-xs cursor-help'
            onClick={handleTogglePasswordDescription}
          >
            ?
          </span>
        </label>
        <input
          className='input input-bordered w-full bg-base-content text-base-100'
          type='password'
          id='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Entrez votre mot de passe'
        />
        {showPasswordDescription && (
          <p className='text-xs text-gray-500 mt-1'>{`Votre mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre minuscule, une lettre majuscule et un chiffre.`}</p>
        )}
      </div>
      <div className='mb-4'>
        <label
          className='block text-base-content text-sm font-bold mb-2'
          htmlFor='password'
        >
          Confirmer votre mot de passe
        </label>
        <input
          className='input input-bordered w-full bg-base-content text-base-100'
          type='password'
          id='confirmPassword'
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          placeholder='Confirmez votre mot de passe'
        />
      </div>
      <button
        className='btn btn-active btn-primary mt-3'
        type='button'
        onClick={handleSubmit}
      >
        S'inscrire
      </button>
    </>
  );
}
