import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-center items-center">
      {/* App Title */}
      <h1 className="text-2xl font-bold mb-10">Repeatly</h1>

      {/* Navigation Links */}
      <ul className="w-full flex flex-col gap-6 text-lg text-center">
        <li>
          <Link
            to="/home"
            className="block p-3 rounded-lg hover:bg-gray-700 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/cycles"
            className="block p-3 rounded-lg hover:bg-gray-700 transition"
          >
            Cycles
          </Link>
        </li>
      </ul>
    </nav>
  );
}
