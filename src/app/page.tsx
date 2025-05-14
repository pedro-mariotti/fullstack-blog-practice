function App() {
  return (
    <>
      <main className="flex max-h-max min-h-screen w-screen items-center justify-center bg-[#455985]">
        <form className="flex w-1/5 flex-col items-center justify-center gap-4 rounded-2xl bg-[#f5f4e6] p-8">
          <h1 className="text-4xl font-bold">User Login</h1>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                className="rounded-md border-1 border-black bg-[#e7e7e7]"
                type="text"
                name="username"
                id="usernameField"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="rounded-md border-1 border-black bg-[#e7e7e7]"
                type="text"
                name="password"
                id="passwordField"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <input
              className="border-1-black cursor-pointer rounded-lg bg-[#dfdcec] p-2"
              type="submit"
              value="Login"
            />
            <input
              className="border-1-black cursor-pointer rounded-lg bg-[#c1f5bf] p-2"
              type="button"
              value="Sign up"
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
