import React from "react";

function Home() {
  return (
      <div className="hero min-h-screen bg-base-200">
        <div>
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://www.colmar.fr/sites/colmar.fr/files/styles/colmar_rect_773_x_520/public/visiter/statue-liberte-colmar.jpg?itok=tO_SQYXn"
              className="max-w-sm h-half rounded-lg shadow-2xl"
              alt="Statue Liberté Colmar" />
            <div>
              <h1 className="text-5xl font-bold">Découvrez City Guide</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>

          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://media.routard.com/image/53/1/pt155031.1363531.w430.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="Colonne de la Déesse Lille" />
            <div>
              <h1 className="text-5xl font-bold">Arpentez la France comme un local</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;