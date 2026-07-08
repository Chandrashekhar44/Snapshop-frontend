"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function AuthButton() {
  const [user, setUser] = useState<string | null>(null);
    const router = useRouter();


  const logoutHandler = async () => {
  const token = localStorage.getItem("token");

  await axios.post(
    "http://localhost:5001/api/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  localStorage.removeItem("userId");
  localStorage.removeItem("token");

  setUser(null);
  router.push("/");
};
  

  

 return user ? (
  <div className="flex items-center gap-3">
    <button
      onClick={() => router.push("/dashboard")}
      className="text-black font-medium"
    >
      Dashboard
    </button>

    <button
      onClick={logoutHandler}
      className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full shadow-md transition"
    >
      Logout
    </button>
  </div>
) : (
  <button
    onClick={() => router.push("/sign-in")}
    className="bg-black text-white px-5 py-2 rounded-full"
  >
    Log In
  </button>
);
}