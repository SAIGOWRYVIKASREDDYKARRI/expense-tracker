function Navbar({ user, onLogout, onViewLogs }) {
  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-600">
        Expense Tracker
      </h1>

      <div className="flex items-center gap-4">
        {user?.role === "ADMIN" && (
          <button
            onClick={onViewLogs}
            className="text-sm px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          >
            View Logs
          </button>
        )}

        <span className="text-gray-600">
          Welcome 👋 {user?.username}
        </span>

        <button
          onClick={onLogout}
          className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
