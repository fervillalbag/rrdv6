import { useState } from "react";
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any>({
    id: uuidv4(),
    name: "",
    age: 0,
  });

  const createUser = async () => {
    await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const { mutate: mutateCreate } = useMutation(createUser);

  const handleCreateUser = (e: any) => {
    e.preventDefault();
    mutateCreate();
    setData({
      id: uuidv4(),
      name: "",
      age: 0,
    });
    navigate("/");
  };

  return (
    <div className="px-10">
      <p className="text-2xl mb-4">Create</p>

      <form>
        <input
          type="text"
          className="block border py-2 px-4 rounded w-64 mb-4"
          value={data.name}
          placeholder="Introduce tu nombre"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="number"
          className="block border py-2 px-4 rounded w-64"
          value={data.age}
          placeholder="Introduce tu edad"
          onChange={(e) => setData({ ...data, age: e.target.value })}
        />

        <button
          className="border border-slate-400 py-2 px-8 rouded mt-4 rounded text-slate-500"
          onClick={handleCreateUser}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
