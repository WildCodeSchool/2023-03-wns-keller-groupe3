import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Sidebar() {
  return (
    <div className='z-10 fixed bottom-0 w-full h-14  md:fixed md:h-full md:menu bg-base-100 md:w-24 flex justify-between rounded-tl-xl rounded-tr-xl md:rounded-r-xl md:rounded-tl-none shadow-[5px_0px_20px_0px_#00000024]'>
      <ul className='flex items-center justify-center w-full md:flex-col'>
        <li className='rounded p-2 mr-10 md:mb-5 md:mr-0'>
          <Link to='/' className='flex flex-col items-center md:block'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6 md:flex md:mx-auto'
            >
              <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
              <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
            </svg>
            <p className='text-xs md:text'>Accueil</p>
          </Link>
        </li>
        <li className='p-2 mr-10 md:mb-5 md:mr-0'>
          <Link to='/cities' className='flex flex-col items-center md:block'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6 md:flex md:mx-auto'
            >
              <path
                fillRule='evenodd'
                d='M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-xs md:text'>Villes</p>
          </Link>
        </li>
        <li className='p-2 md:mb-5 md:mr-0'>
          <Link to='/user' className='flex flex-col items-center md:block'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6 md:flex md:mx-auto'
            >
              <path
                fillRule='evenodd'
                d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-xs md:text'>Profil</p>
          </Link>
        </li>
      </ul>
      <div className='w-16 flex justify-center items-center mx-auto'>
        <img alt='logo' className='hidden md:block mx-auto' src={logo} />
      </div>
    </div>
  );
}
