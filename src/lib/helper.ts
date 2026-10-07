import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
  role: "BUYER" | "SELLER";
  exp: number;
}

export default function getUserRole() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const decoded = jwtDecode<TokenPayload>(token);

  return decoded.role;
}
