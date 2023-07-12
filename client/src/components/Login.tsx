import { Navigate } from "react-router-dom";
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { LOGIN } from "../graphql/queries";
import { toast } from "react-toastify";
import CustomToast from "../utils/CustomToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, error }] = useLazyQuery(LOGIN, {
    variables: { email, password },
  });
  if (data) {
    console.log("data from query", data.login);
    localStorage.setItem("token", data.login);
    return <Navigate to="/" />;
  }
  if (error) {
    console.log("error", error);
  }

  const handleSubmitLogin = async () => {
    if (error) {
      toast(
        <CustomToast
          message={`Vos informations de connection sont erroné`}
          color='text-error'
        />
      );
    } else {
    login();
      }
    }

return (
    <>
      <h2 className="text-6xl text-base-content font-bold mb-10 text">Connexion</h2>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="input input-bordered w-full"
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Entrez votre email"
        />
        </div>
        <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="password">
          Mot de passe
        </label>
        <input
          className="input input-bordered w-full"
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Entrez votre mot de passe"
          />
          </div>
          <button className="btn btn-active btn-primary w-full mt-4" type="button" onClick={ handleSubmitLogin }>
          Se connecter
          </button>
        </>
      );
    }