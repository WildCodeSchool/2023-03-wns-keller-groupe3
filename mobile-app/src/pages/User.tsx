import { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import pinkCity from "../assets/picture/pink.png";
import greenCity from "../assets/picture/green.png";
import snowCity from "../assets/picture/snow.png";

function UserPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div
      className={`container relative flex flex-col items-center xl:justify-center md:h-screen w-full px-9 md:pt-10 md:pl-16 md:pr-0 xl:pl-0 2xl:pb-[120px] xl:pt-0 2xl:pt-16 mx-auto
     ${isRegisterMode ? "mb-[160px] md:pb-8 md:mb-0" : ""}`}
    >
      <form
        className="mt-8 xl:mt-0 max-w-sm flex flex-col w-full relative z-10"
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        {isRegisterMode ? <Signup /> : <Login />}
      </form>
      <p
        className="text-center text-base-content cursor-pointer justify-center items-center mt-4 relative z-10 hover:text-[#ed9986]"
        onClick={toggleMode}
      >
        {isRegisterMode
          ? "Déjà un compte ? Se connecter"
          : "Pas de compte ? S'inscrire"}
      </p>

      <div>
        <div className="absolute right-0 bottom-0 h-auto hidden md:block md:w-[388px] lg:w-[341px] xl:w-[420px] 2xl:w-[510px] opacity-50 border border-[#ffffff59] rounded-[50%]">
          <img src={snowCity} alt="" />
        </div>
        <div className="absolute bottom-0 left-1/2 translate-x-[-50%] hidden lg:block lg:w-[341px] h-auto xl:w-[425px] 2xl:w-[512px] opacity-50">
          <img src={greenCity} alt="" />
        </div>
        <div className="absolute left-0 bottom-0 h-auto md:w-[388px] hidden md:block lg:w-[341px] xl:w-[420px] 2xl:w-[510px] opacity-50">
          <img src={pinkCity} alt="" />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
