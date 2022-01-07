import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>Dashboard</p>

      <Outlet />

      <button onClick={() => navigate("/")}>go to home</button>
      <button onClick={() => navigate("welcome")}>
        go to welcome
      </button>
      <button onClick={() => navigate("goodbye")}>go to bye</button>
    </div>
  );
};

export default Dashboard;
