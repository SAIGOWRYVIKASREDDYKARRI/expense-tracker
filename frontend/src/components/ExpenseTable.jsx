function ExpenseTable({ expenses, onDelete }) {
  return (
    <table className="w-full bg-white mt-6">
      <thead>
        <tr>
          <th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => (
          <tr key={e.id}>
            <td>
              {new Date(e.expense_date).toLocaleDateString("en-IN")}
            </td>

            <td>{e.category}</td>
            <td>{e.description}</td>
            <td>₹{e.amount}</td>
            <td>
              <button
                className="text-red-600"
                onClick={() => onDelete(e.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ExpenseTable;
