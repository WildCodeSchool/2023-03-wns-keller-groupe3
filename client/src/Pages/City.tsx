import { Link } from "react-router-dom";
import { mockData } from "../utils/mockData";

function City() {
  return (
    <div className='flex justify-center items-center h-full'>
      {/* Liste de ville */}
      <ul>
        {mockData.map((c) => (
          <Link key={c.id} to={`/city/${c.id}`}>
            <li>{c.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default City;
