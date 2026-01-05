import { useState } from "react";

function AddExpenseModal({ isOpen, onClose, onSave }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 w-80">
        <input type="number" placeholder="Amount" onChange={e=>setAmount(e.target.value)} className="border p-2 w-full mb-2"/>
        <input placeholder="Category" onChange={e=>setCategory(e.target.value)} className="border p-2 w-full mb-2"/>
        <input placeholder="Description" onChange={e=>setDescription(e.target.value)} className="border p-2 w-full mb-2"/>
        <input type="date" onChange={e=>setDate(e.target.value)} className="border p-2 w-full mb-4"/>
        <button
          className="bg-blue-600 text-white w-full p-2"
          onClick={() => {
            onSave({ amount, category, description, expense_date: date });
            onClose();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
export default AddExpenseModal;
