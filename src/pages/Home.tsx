import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const getCharacters = async () => {
  const res = await fetch(
    "https://www.breakingbadapi.com/api/characters"
  );
  const data = res.json();
  return data;
};

const Home = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("characters", getCharacters);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-4xl">
        Cargando..
      </div>
    );

  return (
    <div className="p-8">
      <p className="text-2xl mb-4">Home</p>

      <Link
        to={`/users/${10}`}
        className="border py-2 px-12 rounded mb-4 inline-block"
      >
        Usuarios
      </Link>

      <div className="grid grid-cols-3 gap-4">
        {data.map((character: any) => (
          <div
            className="border py-2 px-4 mb-4 cursor-pointer"
            key={character.char_id}
            onClick={() =>
              navigate(`/character/${character.char_id}`)
            }
          >
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
