import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const getUsers = async () => {
  const res = await fetch("http://localhost:4000/posts");
  const data = res.json();
  return data;
};

const Home = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery("users", getUsers);

  const deleteUser = async (id: string) => {
    await fetch(`http://localhost:4000/posts/${id}`, {
      method: "DELETE",
    });
  };

  const { mutate: mutateDelete } = useMutation(deleteUser, {
    onSuccess: () => queryClient.invalidateQueries("users"),
    onMutate: (id: string) => {
      const oldUsers: any = queryClient.getQueryData("users");
      const newPosts = oldUsers.filter((x: any) => x.id !== id);
      queryClient.setQueryData("users", newPosts);
    },
  });

  const handleDelete = (id: string) => {
    mutateDelete(id);
  };

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-4xl">
        Cargando..
      </div>
    );

  return (
    <div className="px-10">
      <p className="text-2xl mb-4">Home</p>

      <div className="grid grid-cols-3 gap-4">
        {data.map((user: any) => (
          <div
            className="flex items-center justify-between border py-2 px-4 mb-4"
            key={user.id}
          >
            <p
              onClick={() => navigate(`/user/${user.id}`)}
              className="cursor-pointer"
            >
              {user.name}
            </p>
            <button
              className="border border-red-300 text-slate-500 text-sm py-1 px-2 rounded"
              onClick={() => handleDelete(user.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
