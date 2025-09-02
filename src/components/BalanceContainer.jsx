import { useState, useEffect } from "react";

const BalanceContainer = ({ transaction = [] }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    let inc = 0;
    let exp = 0;

    transaction.forEach((txn) => {
      if (txn.amount < 0) {
        exp += txn.amount;
      } else {
        inc += txn.amount;
      }
    });

    setIncome(inc);
    setExpense(exp);
  }, [transaction]);

  return (
    <div className="balance-card">
      {/* <h2 className="card-title">Account Summary</h2> */}

      <div className="balance-boxes">
        <div className="balance-item">
          <div className="title">Income</div>
          <div className="balance1">${income}</div>
        </div>

        <div className="balance-item">
          <div className="title">Expense</div>
          <div className="balance2">${expense}</div>
        </div>

        <div className="balance-item">
          <div className="title">Balance</div>
          <div className="balance">${income + expense}</div>
        </div>
      </div>
    </div>
  );
};

export default BalanceContainer;
