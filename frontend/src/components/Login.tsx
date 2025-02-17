import { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../utils/UserContext";
import { createContext } from "react";

function useLogin() {
  return {
    id: 1,
    name: "John Lim",
  };
}

// function useLogin() {
//   return "fail";
// }

export default function Login() {
  const { data, status } = useQuery({
    queryKey: ["userData"],
    queryFn: useLogin,
  });

  const userData = data !== undefined ? data : "";

  //   const output = user !== undefined ? user.name : "No user";
  //   return <div>{output}</div>;
  return (
    <UserContext.Provider value={userData}>
      <div>Hello</div>
    </UserContext.Provider>
  );
}
