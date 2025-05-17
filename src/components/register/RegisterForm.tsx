import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const userRegisterNotify = () =>
      toast.success("User registered successfully!");
    const userRegisterErrorNotify = (message: string) => toast.error(message);
    e.preventDefault();
    console.log("Form data:", formData); // Log the form data
    try {
      const response = await fetch(
        "https://backend-crud-practice-theta.vercel.app/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        userRegisterNotify();
      } else {
        const errorData = await response.json();
        console.log(errorData);
        if (errorData.message.includes("Password")) {
          userRegisterErrorNotify(
            "Password must be at least 6 characters long!",
          );
        } else if (
          errorData.message.includes("duplicate") &&
          errorData.message.includes("username")
        ) {
          userRegisterErrorNotify("Username already exists!");
        } else if (errorData.message.includes("email")) {
          userRegisterErrorNotify("Email already exists!");
        } else {
          userRegisterErrorNotify("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
      userRegisterErrorNotify("An error occurred. Please try again.");
    }
  };
  return (
    <form
      className="flex w-1/5 flex-col items-center justify-center gap-4 rounded-2xl bg-[#f1f5f9] p-8"
      onSubmit={handleSubmit}
    >
      <h1 className="text-justify text-4xl font-bold">User Register</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="rounded-md border-1 border-black bg-[#e2e8f0]"
            type="text"
            name="username"
            id="usernameField"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="rounded-md border-1 border-black bg-[#e2e8f0]"
            type="password"
            name="password"
            id="passwordField"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">E-mail</label>
          <input
            className="rounded-md border-1 border-black bg-[#e2e8f0]"
            type="email"
            name="email"
            id="emailField"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <input
          className="border-1-black cursor-pointer rounded-lg bg-[#eb4d25] p-2 text-white"
          type="button"
          value="Return"
          onClick={() => router.push("/")}
        />
        <input
          className="border-1-black cursor-pointer rounded-lg bg-[#22c55e] p-2 text-white"
          type="submit"
          value="Register"
        />
      </div>
    </form>
  );
}
export default RegisterForm;
