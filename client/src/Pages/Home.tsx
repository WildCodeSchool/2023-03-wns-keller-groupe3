import backgroundImage from '../assets/europeMap.png';
import { Link } from "react-router-dom";

function Home() {
  return (
      <div
        className="hero min-h-screen"
        style={{backgroundImage: `url(${backgroundImage})`}}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-2-xl">
            <h1 className="mb-10 text-9xl font-bold outline-black">City Guide</h1>
            <p className="mb-2 text-2xl font-medium text-left ml-20">Parcourir une ville comme un local.</p>
            <p className="mb-2 text-2xl font-medium">Aller droit au but.</p>
            <p className="mb-5 text-2xl font-medium text-right mr-20">Découvrir des perles rares.</p>
            <Link to='/city'><button className="btn btn-primary">Explorez maintenant !</button></Link>
          </div>
        </div>
      </div>
  );
}

export default Home;