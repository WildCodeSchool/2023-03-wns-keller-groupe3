import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      id
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

export default function Subscribe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [addUser, { error, loading }] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USER],
  });
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  const handleSubmit = async () => {
    console.log("arriver dans la fonction handlsubmit")
      try {
        await addUser({ variables: { email, name, password } });
        navigate ("/");
      } catch (addUserError) {
        console.error("catcherror de la fonction ", error);
      }
  };

  return (
    <>
    <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
      Nom
    </label>
    <input
      className="input input-bordered w-full"
      type="text"
      id="name"
      value={name}
      onChange={(e) => {
        setName(e.target.value);
      }}
      placeholder="Entrez votre nom"
    />
    </div>
    <div className="mb-4">
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
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
      <button className="btn btn-active btn-primary" type="button" onClick={ handleSubmit }>
      S'inscrire
      </button>
  </>
    )
}