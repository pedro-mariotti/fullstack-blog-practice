function NavBar(props: { handleLogout: () => void }) {
  return (
    <nav className="w-full bg-[#0f172a] p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <div className="mt-2 flex w-full flex-wrap items-center justify-between gap-2 sm:mt-0 sm:w-auto sm:flex-nowrap">
          <button
            onClick={props.handleLogout}
            className="mt-2 cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 sm:mt-0"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
