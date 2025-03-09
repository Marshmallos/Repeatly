import { useAuth } from "../utils/useAuth";

export default function Welcome() {
  const { user } = useAuth();

  return (
    <div className="text-center text-2xl font-semibold text-gray-900">
      Welcome, {user?.username}!
    </div>
  );
}
