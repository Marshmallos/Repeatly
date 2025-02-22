import { useAuth } from "../utils/useAuth";

export default function Welcome() {
  const { user } = useAuth();
  return (
    <div className="flex justify-center items-center h-screen bg-sky-500">
      {/* Enter title here */}
      Welcome {user?.username}
    </div>
  );
}
