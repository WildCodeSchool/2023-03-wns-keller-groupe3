import backgroundImage from "../assets/europeMap.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className='hero min-h-screen bg-base-content'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='hero-overlay '></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-2-xl text-base-content'>
          <h1 className='mb-5 text-5xl font-bold'>City Guide</h1>
          <p className='mb-5'>
            Parcourir une ville comme un local. Aller droit au but. <br />
            Découvrir des perles rares.
          </p>
          <Link to='/cities'>
            <button className='btn btn-primary'>Explorez maintenant !</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
