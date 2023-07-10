import backgroundImage from "../assets/europeMap.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className='hero min-h-screen'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-2-xl'>
          <h1 className='mb-20 text-5xl font-bold'>City Guide</h1>
          <p className='mb-2 text-xl font-medium'>
            Parcourir une ville comme un local.
          </p>
          <p className='mb-2 text-xl font-medium'>Aller droit au but.</p>
          <p className='mb-10 text-xl font-medium'>
            Découvrir des perles rares.
          </p>
          <Link to='/cities'>
            <button className='btn btn-md btn-block max-w-md btn-primary'>
              Explorez maintenant !
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
