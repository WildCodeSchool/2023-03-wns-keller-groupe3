import backgroundImage from "../assets/homepage.png";
import icon1 from "../assets/icon/iconHome1.png";
import icon2 from "../assets/icon/iconHome2.png";
import icon3 from "../assets/icon/iconHome3.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    // <div
    //   className='hero min-h-screen bg-base-content'
    //   style={{ backgroundImage: `url(${backgroundImage})` }}
    // >
    //   <div className='hero-overlay '></div>
    //   <div className='hero-content text-center text-neutral-content'>
    //     <div className='max-w-2-xl text-base-content'>
    //       <h1 className='mb-5 text-5xl font-bold'>City Guide</h1>
    //       <p className='mb-5'>
    //         Parcourir une ville comme un local. Aller droit au but. <br />
    //         Découvrir des perles rares.
    //       </p>
    //       <Link to='/cities'>
    //         <button className='btn btn-primary'>Explorez maintenant !</button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <div className="md:ml-24">
      <div
        className="homeback flex relative justify-center h-[400px] bg-cover bg-no-repeat bg-center items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-white text-5xl relative z-10 font-bold">
          Bienvenue dans notre Guide City !
        </h1>
      </div>
      <div className="bg-[#fefefe] p-9">
        <div className="flex justify-center items-end">
          <div className="card-home">
            <div>
              <h3 className="mb-4 text-[#1f1b23] text-center">
                Laissez-vous guider par notre site : trouvez facilement les
                points d'intérêt, les attractions, et les expériences uniques de
                chaque destination
              </h3>
            </div>
            <div className="rounded-img">
              <img src={icon1} alt="" />
            </div>
          </div>
          <div className="card-home">
            <div>
              <h3 className="mb-4 text-[#1f1b23] text-center">
                Explorez les villes où vous souhaitez vous rendre : plongez dans
                la culture locale, goûtez à la cuisine authentique, et explorez
                des quartiers pittoresques.
              </h3>
            </div>
            <div className="rounded-img">
              <img src={icon2} alt="" />
            </div>
          </div>
          <div className="card-home">
            <div>
              <h3 className="mb-4 text-[#1f1b23] text-center">
                Faites des rencontres mémorables : rencontrez les habitants,
                partagez des expériences, et créez des liens.{" "}
              </h3>
            </div>
            <div className="rounded-img">
              <img src={icon3} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link to="/cities">
          <button className="btn btn-primary">Explorez maintenant !</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
