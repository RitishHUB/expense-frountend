import { useState, useEffect } from "react";
import History from "./History";
import ExpenseForm from "./ExpenseForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BalanceContainer from "./BalanceContainer";

const Container = () => {
  const [transaction, setTransaction] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // 🔹 Fetch expenses from backend
  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then((res) => res.json())
      .then((data) => setTransaction(data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  // 🔹 Add or update expense
  const addExpense = async (title, amount) => {
    try {
      if (editItem) {
        // update local only for now (you can add PUT API later)
        setTransaction(
          transaction.map((txn) =>
            txn._id === editItem._id
              ? { ...txn, title, amount: parseFloat(amount) }
              : txn
          )
        );
        toast.success("Expense updated!");
        setEditItem(null);
      } else {
        // call backend POST API
        const res = await fetch("https://expensebackend-1-01rv.onrender.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, amount }),
        });

        if (res.ok) {
          const newExpense = await res.json(); // return saved doc
          setTransaction([...transaction, newExpense]);
          toast.info("Expense added successfully!");
        }
      }
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // 🔹 Delete expense
  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`https://expensebackend-1-01rv.onrender.com/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTransaction(transaction.filter((txn) => txn._id !== id));
        toast.error("Expense deleted!");
      }
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const editExpense = (item) => {
    setEditItem(item);
  };

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <BalanceContainer transaction={transaction} />

      <History
        transactions={transaction}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />

      <ExpenseForm addExpense={addExpense} editItem={editItem} />
    </div>
  );
};

export default Container;
