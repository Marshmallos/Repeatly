import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <nav className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-center items-center">
      {/* App Title */}
      <h1 className="text-2xl font-bold mb-10">Repeatly</h1>

      {/* Navigation Links */}
      <ul className="w-full flex flex-col gap-6 text-lg text-center">
        <li>
          <NavLink
            to="/home"
            className="block p-3 rounded-lg hover:bg-gray-700 transition"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cycles"
            className="block p-3 rounded-lg hover:bg-gray-700 transition"
          >
            Cycles
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
