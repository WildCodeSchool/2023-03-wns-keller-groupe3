import { Navigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

const LOGIN = gql`
  query Query($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

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
    login();
  };

  return (
    <>
      <div className="mb-4 w-full">
        <label
          className="block text-base-content text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="input input-bordered bg-base-content text-base-100 w-full"
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
        <label
          className="block text-base-content text-sm font-bold mb-2 "
          htmlFor="password"
        >
          Mot de passe
        </label>
        <input
          className="input input-bordered bg-base-content text-base-100 w-full"
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <button
        className="btn btn-active btn-primary w-full mb-4"
        type="button"
        onClick={handleSubmitLogin}
      >
        Se connecter
      </button>
    </>
  );
}
