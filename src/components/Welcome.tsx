import { useNavigate } from "react-router";

export default function Welcome() {
  const navigate = useNavigate();
  function login() {
    navigate("/home");
  }

  return (
    <div className="flex justify-around items-center pt-48">
      <div>
        <p className="text-2xl">Welcome to Repeatly</p>
        <div className="flex flex-col items-center bg-amber-400 rounded-3xl py-4">
          <label>Username:</label>
          <input type="text" className="bg-black" />
          <label>Password:</label>
          <input type="password" className="bg-black" />
          <button
            className="py-2 border-1 rounded-2xl bg-white hover:bg-green-400"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
