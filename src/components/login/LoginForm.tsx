import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorNotify = () => toast.error("Invalid username or password");

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

        localStorage.setItem("authToken", data.token);
        console.log("Login successful:", data);
        router.push("/dashboard");
      } else {
        errorNotify();
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <form
      className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl bg-[#f1f5f9] p-8 sm:w-3/5 md:w-2/5 lg:w-1/4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        User Login
      </h1>
      <div className="flex w-full flex-col gap-6 sm:gap-8">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm sm:text-base">
            Username
          </label>
          <input
            className="rounded-md border border-black bg-[#e2e8f0] p-2 text-sm sm:text-base"
            type="text"
            name="username"
            id="usernameField"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm sm:text-base">
            Password
          </label>
          <input
            className="rounded-md border border-black bg-[#e2e8f0] p-2 text-sm sm:text-base"
            type="password"
            name="password"
            id="passwordField"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between">
        <input
          className="cursor-pointer rounded-lg bg-[#2563eb] p-2 text-sm text-white hover:bg-[#1d4ed8] sm:text-base"
          type="submit"
          value="Login"
        />
        <input
          className="cursor-pointer rounded-lg bg-[#22c55e] p-2 text-sm text-white hover:bg-[#16a34a] sm:text-base"
          type="button"
          value="Sign up"
          onClick={() => router.push("/register")}
        />
      </div>
    </form>
  );
}
export default LoginForm;
