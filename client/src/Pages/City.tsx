import { Link } from "react-router-dom";
import { mockData } from "../utils/mockData";

function City() {
  return (
    <>
      <h1>City</h1>
      {/* Liste de ville */}
      <ul>
        {mockData.map((c) => (
          <Link key={c.id} to={`/city/${c.id}`}>
            <li>{c.name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default City;
