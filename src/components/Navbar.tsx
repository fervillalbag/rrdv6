import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-10">
      <ul className="flex">
        <li className="mr-10">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="mr-10">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li className="mr-10">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/create"
          >
            Create
          </NavLink>
        </li>
        <li className="mr-10">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
