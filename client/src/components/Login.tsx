import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { LOGIN } from "../graphql/queries";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, error }] = useLazyQuery(LOGIN, {
    variables: { email, password },
  });

  const handleSubmitLogin = async () => {
    try {
      login();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (data) {
    console.log("I'm logged in : ", data);
    localStorage.setItem("token", data.login);
    return <Navigate to='/' />;
  }

  if (error) {
    console.log("Wrong credentials : ", data);
    console.error("Login error:", error);
    toast(
      <CustomToast
        message={`Vos informations de connexion sont erronées`}
        color='text-error'
      />
    );
  }

  return (
    <>
      <h2 className='text-3xl sm:text-4xl text-base-content font-bold mb-10 text'>
        Connexion
      </h2>
      <div className='mb-4 w-full'>
        <label
          className='block text-base-content text-sm font-bold mb-2'
          htmlFor='email'
        >
          Email
        </label>
        <input
          className='input input-bordered bg-base-content text-base-100 w-full'
          type='email'
          id='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder='Entrez votre email'
        />
      </div>
      <div className='mb-4 w-full'>
        <label
          className='block text-base-content text-sm font-bold mb-2 '
          htmlFor='password'
        >
          Mot de passe
        </label>
        <input
          className='input input-bordered bg-base-content text-base-100 w-full'
          type='password'
          id='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Entrez votre mot de passe'
        />
      </div>
      <button
        className='btn btn-active btn-primary w-full mt-4'
        type='button'
        onClick={handleSubmitLogin}
      >
        Se connecter
      </button>
    </>
  );
}
