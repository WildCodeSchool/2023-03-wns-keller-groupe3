import { useState } from "react";
import Subscribe from "../components/Subscribe";
import Login from "../components/Login";

function UserPage () {
  const [isRegisterMode, setIsRegisterMode] = useState(false);


  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <form
        className="max-w-sm flex flex-col w-full"
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        {isRegisterMode ? <Subscribe /> : <Login />}
      </form>
      <p
        className="text-center text-gray-600 cursor-pointer justify-center items-center"
        onClick={toggleMode}
      >
        {isRegisterMode ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
      </p>
    </div>
);
};

export default UserPage;
