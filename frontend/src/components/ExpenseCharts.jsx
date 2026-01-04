import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function ExpenseCharts({ expenses }) {
  // -------- MONTHLY DATA --------
  const monthlyMap = {};

  expenses.forEach((exp) => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "short",
    });

    monthlyMap[month] =
      (monthlyMap[month] || 0) + Number(exp.amount);
  });

  const monthlyData = Object.keys(monthlyMap).map((month) => ({
    month,
    amount: monthlyMap[month],
  }));

  // -------- CATEGORY DATA --------
  const categoryMap = {};

  expenses.forEach((exp) => {
    categoryMap[exp.category] =
      (categoryMap[exp.category] || 0) + Number(exp.amount);
  });

  const categoryData = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    value: categoryMap[cat],
  }));

  const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b", "#7c3aed"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Monthly Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-4">
          Monthly Expenses
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-4">
          Category-wise Expenses
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseCharts;
