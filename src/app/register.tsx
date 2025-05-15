function Register() {
  return (
    <>
      <main className="flex max-h-max min-h-screen w-screen items-center justify-center bg-[#1e293b] text-[#0f172a]">
        <form className="flex w-1/5 flex-col items-center justify-center gap-4 rounded-2xl bg-[#f1f5f9] p-8">
          <h1 className="text-4xl font-bold">User Login</h1>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                className="rounded-md border-1 border-black bg-[#e2e8f0]"
                type="text"
                name="username"
                id="usernameField"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="rounded-md border-1 border-black bg-[#e2e8f0]"
                type="text"
                name="password"
                id="passwordField"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <input
              className="border-1-black cursor-pointer rounded-lg bg-[#2563eb] text-white p-2"
              type="submit"
              value="Login"
            />
            <input
              className="border-1-black cursor-pointer rounded-lg bg-[#22c55e] text-white p-2"
              type="button"
              value="Sign up"
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default Register;