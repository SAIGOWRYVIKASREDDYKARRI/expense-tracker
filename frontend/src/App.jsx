import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import ExpenseTable from "./components/ExpenseTable";
import AddExpenseModal from "./components/AddExpenseModal";
import ExpenseCharts from "./components/ExpenseCharts";
import AdminLogs from "./components/AdminLogs";

function App() {
  // ---------------- STATES ----------------
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logsRef = useRef(null);

  // ---------------- LOGIN ----------------
  const handleLogin = async (username, password) => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    const data = await res.json();
    setUser(data);
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    setUser(null);
    setExpenses([]);
  };

  // ---------------- VIEW LOGS (ADMIN) ----------------
  const handleViewLogs = () => {
    logsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ---------------- LOAD EXPENSES ----------------
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/expenses/${user.id}`)
      .then((r) => r.json())
      .then(setExpenses);
  }, [user]);

  // ---------------- ADD EXPENSE ----------------
  const addExpense = async (expense) => {
    await fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...expense,
        userId: user.id,
      }),
    });

    const updated = await fetch(
      `http://localhost:5000/expenses/${user.id}`
    ).then((r) => r.json());

    setExpenses(updated);
  };

  // ---------------- DELETE EXPENSE ----------------
  const deleteExpense = async (expenseId) => {
    const res = await fetch(
      `http://localhost:5000/expenses/${expenseId}?userId=${user.id}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    setExpenses(expenses.filter((e) => e.id !== expenseId));
  };

  // ---------------- CALCULATIONS ----------------
  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpense = expenses.reduce((sum, e) => {
    const d = new Date(e.expense_date);
    if (
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    ) {
      return sum + Number(e.amount);
    }
    return sum;
  }, 0);

  const categoriesCount = new Set(
    expenses.map((e) => e.category)
  ).size;

  // ---------------- LOGIN UI ----------------
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-xl font-bold mb-4 text-center">
            Login
          </h2>

          <input
            id="username"
            placeholder="Username"
            className="border p-2 w-full mb-2"
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4"
          />

          <button
            className="bg-blue-600 text-white w-full py-2 rounded"
            onClick={() =>
              handleLogin(
                document.getElementById("username").value,
                document.getElementById("password").value
              )
            }
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onViewLogs={handleViewLogs}
      />

      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-3">
          Dashboard
        </h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Expense
        </button>

        <DashboardCards
          totalExpense={totalExpense}
          monthlyExpense={monthlyExpense}
          categoriesCount={categoriesCount}
        />

        <ExpenseTable
          expenses={expenses}
          onDelete={deleteExpense}
        />

        <ExpenseCharts expenses={expenses} />

        {/* ADMIN LOGS */}
        <div ref={logsRef}>
          <AdminLogs user={user} />
        </div>
      </main>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addExpense}
      />
    </div>
  );
}

export default App;
