import { useEffect, useState } from "react";
import BalanceContainer from "./components/BalanceContainer";
import ExpenseForm from "./components/ExpenseForm";
import History from "./components/History";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const API_URL = "http://localhost:5000/transactions"; // change if backend hosted

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add or Update
  const addExpense = async (title, amount) => {
    const newTxn = { title, amount: Number(amount) };

    try {
      if (editItem) {
        // Update
        await fetch(`${API_URL}/${editItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTxn),
        });
        setEditItem(null);
      } else {
        // Add
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTxn),
        });
      }

      fetchTransactions();
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  // Delete
  const deleteExpense = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  // Edit
  const editExpense = (txn) => {
    setEditItem(txn);
  };

  return (
    <div className="container">
      <h2>Expense Tracker</h2>
      <BalanceContainer transaction={transactions} />
      <ExpenseForm addExpense={addExpense} editItem={editItem} />
      <History
        transactions={transactions}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />
    </div>
  );
}

export default App;
