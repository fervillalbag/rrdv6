import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const getUser = async (id: string) => {
  const res = await fetch(`http://localhost:4000/posts/${id}`);
  const data = await res.json();
  return data;
};

const updateUser = async (data: any, id: string) => {
  const res = await fetch(`http://localhost:4000/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};

const CharacterDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [dataCurrent, setDataCurrent] = useState<any>({
    id: "",
    name: "",
    age: 0,
  });

  if (!id)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-4xl">
        Wait
      </div>
    );

  const { data, isLoading } = useQuery("character", () =>
    getUser(id)
  );

  const { mutate: mutateUpdate } = useMutation(
    () => updateUser(dataCurrent, id),
    {
      onSuccess: () => queryClient.invalidateQueries("users"),
      onMutate: () => {
        console.log("he");
      },
    }
  );

  useEffect(() => {
    if (isLoading) return;
    setDataCurrent(data);
  }, [isLoading, data]);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-4xl">
        Loading...
      </div>
    );

  const handleUpdate = (e: any) => {
    e.preventDefault();
    mutateUpdate();
    navigate("/");
  };

  return (
    <div className="px-10">
      <p className="text-2xl mb-4">Update</p>

      <form>
        <p className="mb-2">Name:</p>
        <input
          type="text"
          value={dataCurrent.name}
          className="block border py-2 px-4 rounded w-64 mb-4"
          placeholder="Introduce un nombre"
          onChange={(e) =>
            setDataCurrent({ ...dataCurrent, name: e.target.value })
          }
        />
        <p className="my-2">Age:</p>
        <input
          type="number"
          value={dataCurrent.age}
          className="block border py-2 px-4 rounded w-64 mb-4"
          placeholder="Introduce un nombre"
          onChange={(e) =>
            setDataCurrent({ ...dataCurrent, age: e.target.value })
          }
        />

        <button
          className="border border-slate-400 py-2 px-8 rouded mt-2 rounded text-slate-500"
          onClick={handleUpdate}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CharacterDetail;
