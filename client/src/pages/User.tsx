import { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

function UserPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div className='container flex flex-col justify-center items-center h-screen w-full px-9 mx-auto'>
      <form
        className='max-w-sm flex flex-col w-full'
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        {isRegisterMode ? <Signup /> : <Login />}
      </form>
      <p
        className='text-center text-base-content cursor-pointer justify-center items-center mt-4'
        onClick={toggleMode}
      >
        {isRegisterMode
          ? "Déjà un compte ? Se connecter"
          : "Pas de compte ? S'inscrire"}
      </p>
    </div>
  );
}

export default UserPage;
