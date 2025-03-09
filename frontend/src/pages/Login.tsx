import { FormEvent, useState } from "react";
import { apiUrl } from "../constants";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router";
import { UserFormData, User } from "../types";

async function authenticateUser(formData: UserFormData) {
  const url = `${apiUrl.server}/${apiUrl.authUser}/`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Incorrect username or password. Please try again");
  }
  return response.json();
}

async function createUser(formData: UserFormData) {
  const url = `${apiUrl.server}/${apiUrl.users}/${apiUrl.createUser}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export default function Login() {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const inputStyle = "shadow-xs rounded-lg p-1 bg-white";
  const submitBtnStyle =
    "text-xs font-bold p-2 rounded-full bg-green-500 hover:bg-green-600";
  const btnStyle = "text-xs";

  function handleOnChange(key: string, value: string) {
    setFormData({ ...formData, [key]: value });
  }

  function isUser(user: unknown): user is User {
    return (
      typeof user === "object" &&
      user !== null &&
      "username" in user &&
      typeof (user as User).username === "string"
    );
  }

  const mutation = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (res) => {
      const userData = res.data;
      if (!userData || !isUser(userData)) {
        console.error("Invalid user data received");
        return;
      }
      login(userData);
      navigate("/home");
    },
    onError: (error) => {
      console.log("Error ", error);
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (res) => {
      console.log("user created", res.data);
      const userData = res.data;
      if (!userData || !isUser(userData)) {
        console.error("Invalid user data received");
        return;
      }
      login(userData);
      navigate("/home");
    },
    onError: (error) => {
      console.log("Error: ", error);
      alert(error);
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (showSignup) {
      createUserMutation.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  }

  return (
    <div className="h-screen bg-sky-500 flex justify-center items-center">
      <div className="border-1 p-10 rounded-2xl shadow-2xl bg-sky-200 border-sky-400">
        <h1 className="text-4xl text-center pb-16 font-bold">
          {showSignup ? "Sign Up" : "Sign In"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className={inputStyle}
              required
              value={formData?.username}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className={inputStyle}
              value={formData?.password}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              required
            />
            {showSignup && (
              <input
                id="email"
                name="email"
                type="email"
                placeholder="student.edu@school.com"
                className={inputStyle}
                value={formData?.email}
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                required
              />
            )}
            <button type="submit" className={submitBtnStyle}>
              {showSignup ? "Sign Up" : "Login"}
            </button>
            <div className="flex justify-between">
              <button
                className={btnStyle}
                onClick={() => setShowSignup((current) => !current)}
              >
                {showSignup ? "Login" : "Sign Up"}
              </button>
              <button className={btnStyle}>Forgot Password?</button>
            </div>
            {mutation.error && (
              <p className="text-red-600 max-w-xs text-center">
                Error: {(mutation.error as Error).message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
