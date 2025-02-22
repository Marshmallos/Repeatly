import { FormEvent, useState } from "react";
import { apiUrl } from "../constants";
import { useMutation } from "@tanstack/react-query";

export interface userFormData {
  username: string;
  password: string;
  email?: string;
}

async function authenticateUser(formData: userFormData) {
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

async function createUser(formData: userFormData) {
  const url = `${apiUrl.server}/${apiUrl.createUser}/`;
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
  const [formData, setFormData] = useState<userFormData>({
    username: "",
    password: "",
    email: "",
  });
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const inputStyle = "shadow-xs rounded-lg p-1 bg-white";
  const submitBtnStyle =
    "text-xs font-bold p-2 rounded-full bg-green-500 hover:bg-green-600";
  const btnStyle = "text-xs";

  function handleOnChange(key: string, value: string) {
    setFormData({ ...formData, [key]: value });
  }

  const mutation = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (data) => {
      console.log("user authenticated: ", data);
    },
    onError: (error) => {
      console.log("Error ", error);
      alert(error);
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("user created", data);
    },
    onError: (error) => {
      console.log("Error: ", error);
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
    <div className="border-1 p-10 rounded-2xl shadow-2xl bg-sky-200 border-sky-400">
      <h1 className="text-4xl text-center pb-16 font-bold">Sign In</h1>
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
              Sign Up
            </button>
            <button className={btnStyle}>Forgot Password?</button>
          </div>
          {mutation.error && (
            <p style={{ color: "red" }}>
              Error: {(mutation.error as Error).message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
