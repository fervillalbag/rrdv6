import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const getUser = async (id: string) => {
  const res = await fetch(`http://localhost:4000/posts/${id}`);
  const data = await res.json();
  return data;
};

const CharacterDetail = () => {
  const { id } = useParams();
  if (!id)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-4xl">
        Wait
      </div>
    );

  const { data, isLoading } = useQuery("character", () =>
    getUser(id)
  );

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-4xl">
        Loading...
      </div>
    );

  return (
    <div className="p-10">
      <p className="text-3xl font-bold mb-4">User</p>

      <p>Name: {data.name}</p>
    </div>
  );
};

export default CharacterDetail;
