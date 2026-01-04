function DashboardCards({ totalExpense, monthlyExpense, categoriesCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">
          Total Expense
        </h3>
        <p className="text-2xl font-bold text-red-500">
          ₹{totalExpense}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">
          This Month
        </h3>
        <p className="text-2xl font-bold text-blue-500">
          ₹{monthlyExpense}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">
          Categories
        </h3>
        <p className="text-2xl font-bold text-green-500">
          {categoriesCount}
        </p>
      </div>

    </div>
  );
}

export default DashboardCards;
