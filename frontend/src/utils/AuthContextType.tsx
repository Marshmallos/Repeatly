import { User } from "./User";

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
