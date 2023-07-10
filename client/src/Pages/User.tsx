import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      userId
      email
      name
    }
  }
`;

export const GET_USER = gql` {
    query getUser {
      id
      name
      mail
    }
  }
`;

function Login () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [addUser, { data, error, loading }] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USER],
  });
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }
  console.log(data);

  const handleSubmit = async () => {
    if (isRegisterMode) {
      try {
        const { data } = await addUser({ variables: { email, name, password } });
        console.log("try de la fonction handlesubmit",data);
        // Faites quelque chose avec les données retournées par la mutation d'ajout d'utilisateur
      } catch (error) {
        console.error("catcherror de la fonction ", error);
        // Gérez l'erreur en cas d'échec de la mutation d'ajout d'utilisateur
      }
    } else {
      // Votre logique pour la connexion de l'utilisateur existant
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <form className="w-full max-w-sm" onSubmit={async (e) => {
        e.preventDefault();
      }}>
        {isRegisterMode && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Entrez votre nom"
              required
            />
          </div>
        )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Entrez votre email"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Mot de passe
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Entrez votre mot de passe"
          required
          />
          {!isRegisterMode && (
          <div className="mb-4">
            <a className="text-sm text-blue-500" href="/mot-de-passe-oublie">
              Mot de passe oublié ?
            </a>
            </div>
          )}
        </div>
      <div className="flex items-center justify-between">
      <button className="btn btn-outline mr-5" type="button" onClick={() => {
        console.log('click');
        isRegisterMode && handleSubmit();
      }}>
          {isRegisterMode ? "S'inscrire" : 'Se connecter'}
      </button>
      <button className="btn btn-outline" onClick={toggleMode} type="button">
          {isRegisterMode ? 'Déjà un compte ? Se connecter' : "Pas de compte ? S'inscrire"}
      </button>
      </div>
    </form>
  </div>
);
};

export default Login;
