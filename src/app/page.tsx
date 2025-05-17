"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function App() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://backend-crud-practice-theta.vercel.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful login (e.g., save token, redirect)
        console.log("Login successful:", data);
        router.push("/dashboard");
      } else {
        // Handle login failure
        console.error("Login failed");
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <main className="flex max-h-max min-h-screen w-screen items-center justify-center bg-[#1e293b] text-[#0f172a]">
        <form
          className="flex w-1/5 flex-col items-center justify-center gap-4 rounded-2xl bg-[#f1f5f9] p-8"
          onSubmit={handleSubmit}
        >
          <h1 className="text-justify text-4xl font-bold">User Login</h1>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                className="rounded-md border-1 border-black bg-[#e2e8f0]"
                type="text"
                name="username"
                id="usernameField"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="rounded-md border-1 border-black bg-[#e2e8f0]"
                type="password"
                name="password"
                id="passwordField"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <input
              className="border-1-black cursor-pointer rounded-lg bg-[#2563eb] p-2 text-white"
              type="submit"
              value="Login"
            />
            <input
              className="border-1-black cursor-pointer rounded-lg bg-[#22c55e] p-2 text-white"
              type="button"
              value="Sign up"
              onClick={() => router.push("/register")}
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
