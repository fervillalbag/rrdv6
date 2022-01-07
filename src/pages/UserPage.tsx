import { useParams } from "react-router-dom";

const UserPage = () => {
  const { id } = useParams();

  return (
    <div>
      <p>User {id}</p>
    </div>
  );
};

export default UserPage;
