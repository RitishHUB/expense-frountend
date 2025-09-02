import { useState } from "react";   // ✅ you forgot this import
import Container from "./components/Container.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ❌ You cannot redefine Container here (you already import it above)
// ✅ So I renamed it to AppContainer
const AppContainer = () => {
  const [transactions, setTransactions] = useState([]); // ❌ INITIAL removed, use empty array
  const [editItem, setEditItem] = useState(null);
  console.log(editItem);

  const addExpense = async (title, amount) => {
    console.log("asdfgh");
    
    await fetch("https://expensebackend-1-01rv.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, amount: Number(amount) }),
    });
  };

  return (
    <>
      <Container />
      <ToastContainer />
    </>
  );
};

export default AppContainer;
