function ExpenseTable({ expenses, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Recent Expenses
      </h3>

      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="py-2">Date</th>
                <th className="py-2">Category</th>
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Amount</th>
                <th className="py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((exp, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{exp.date}</td>
                  <td className="py-2">{exp.category}</td>
                  <td className="py-2">{exp.description}</td>
                  <td className="py-2 text-right text-red-500">
                    ₹{exp.amount}
                  </td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => onDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
