import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Home</p>

      <Link to={`/users/${10}`}>Usuarios</Link>
    </div>
  );
};

export default Home;
