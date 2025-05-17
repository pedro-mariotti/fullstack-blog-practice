"use client";
import RegisterForm from "@/components/register/RegisterForm";
import { ToastContainer } from "react-toastify";

function Register() {
  return (
    <>
      <main className="flex max-h-max min-h-screen w-screen items-center justify-center bg-[#1e293b] text-[#0f172a]">
        <RegisterForm />
      </main>
      <ToastContainer />
    </>
  );
}

export default Register;
