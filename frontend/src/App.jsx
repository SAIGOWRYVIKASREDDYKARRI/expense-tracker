import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import ExpenseTable from "./components/ExpenseTable";
import AddExpenseModal from "./components/AddExpenseModal";
import ExpenseCharts from "./components/ExpenseCharts";

function App() {
  // -----------------------------
  // STATES
  // -----------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load expenses safely from LocalStorage
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  // -----------------------------
  // ADD EXPENSE
  // -----------------------------
  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  // -----------------------------
  // DELETE EXPENSE
  // -----------------------------
  const deleteExpense = (index) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((_, i) => i !== index)
    );
  };

  // -----------------------------
  // SAVE TO LOCAL STORAGE
  // -----------------------------
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // -----------------------------
  // DASHBOARD CALCULATIONS
  // -----------------------------
  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpense = expenses.reduce((sum, exp) => {
    const expDate = new Date(exp.date);
    if (
      expDate.getMonth() === currentMonth &&
      expDate.getFullYear() === currentYear
    ) {
      return sum + Number(exp.amount);
    }
    return sum;
  }, 0);

  const categoriesCount = new Set(
    expenses.map((exp) => exp.category)
  ).size;

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-2">
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

        {/* Charts Section */}
        <ExpenseCharts expenses={expenses} />
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
