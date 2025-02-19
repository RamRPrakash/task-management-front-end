"use client";

import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../tasks/Loader";

export default function Dashboard() {
  const { user, logout, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader />
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user?.name || "User"}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
