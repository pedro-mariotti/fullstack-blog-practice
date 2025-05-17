"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "@/components/login/LoginForm";
import { Inter, Pacifico } from "next/font/google"; // Import a stylized font

const inter = Inter({ subsets: ["latin"] }); // Load the Inter font
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" }); // Load the Pacifico font

function SearchParamsHandler() {
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

  return null;
}

function App() {
  return (
    <>
      <main
        className={`flex max-h-max min-h-screen w-screen flex-col items-center justify-center bg-[#1e293b] text-[#0f172a] ${inter.className}`}
      >
        <div className="mb-8 flex flex-col gap-12 text-center">
          <h1 className={`text-8xl font-bold text-white ${pacifico.className}`}>
            Blog4U
          </h1>
          <p className="text-sm text-gray-400">Your own personal blog!</p>
        </div>
        <LoginForm />
      </main>
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
