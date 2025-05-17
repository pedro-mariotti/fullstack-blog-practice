"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "@/components/login/LoginForm";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] }); // Load the Inter font

function App() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "unauthorized") {
      toast.warn("You must log in to access the dashboard.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [searchParams]);

  return (
    <>
      <main
        className={`flex max-h-max min-h-screen w-screen items-center justify-center bg-[#1e293b] text-[#0f172a] ${inter.className}`}
      >
        <LoginForm />
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
