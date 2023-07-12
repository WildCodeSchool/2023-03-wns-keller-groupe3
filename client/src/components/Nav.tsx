import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Sidebar() {
  return (
    <div className="z-10 fixed bottom-0 w-full h-14  md:fixed md:h-full md:menu bg-base-100 md:w-24 flex justify-between rounded-tl-xl rounded-tr-xl md:rounded-r-xl md:rounded-tl-none shadow-[5px_0px_20px_0px_#00000024]">
      <img
        alt="logo"
        className="hidden md:block md:mask mask-circle w-14 mx-auto"
        src={logo}
      />
      <ul className="flex items-center justify-center w-full md:flex-col">
        <li className="rounded p-2 mr-10 md:mb-5 md:mr-0">
          <Link to="/" className="flex flex-col items-center md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 md:flex md:mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <p className="text-xs md:text">Accueil</p>
          </Link>
        </li>
        <li className="p-2 mr-10 md:mb-5 md:mr-0">
          <Link to="/cities" className="flex flex-col items-center md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 md:flex md:mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
            <p className="text-xs md:text">Ville</p>
          </Link>
        </li>
        <li className="p-2 md:mb-5 md:mr-0">
          <Link to="/user" className="flex flex-col items-center md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 md:flex md:mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <p className="text-xs md:text">Profil</p>
          </Link>
        </li>
      </ul>
      <div />
    </div>
  );
}
