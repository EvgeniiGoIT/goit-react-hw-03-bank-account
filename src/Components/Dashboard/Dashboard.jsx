import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TYPE from "../../Constant/TYPE";
import MESSAGE from "../../Constant/MESSAGE";
import styles from "./Dashboard.module.css";
import Controls from "./../Controls/Controls";
import Balance from "./../Balance/Balance";
import TransactionHistory from "./../TransactionHistory/TransactionHistory";

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0
  };

  handleTransaction = (value, type) => {
    this.checkTransaction(value, type);
  };
  checkTransaction = (value, type) => {
    const { balance } = this.state;
    if (!value || value < 0) {
      toast(MESSAGE.zero);
      return;
    }
    if (type === TYPE.withdraw && value > balance) {
      toast(MESSAGE.noEnough);
      return;
    }
    this.saveTransaction(value, type);
  };
  saveTransaction = (value, type) => {
    const newTransaction = this.setTransaction(value, type);
    this.setState(prevState => ({
      transactions: [...prevState.transactions, newTransaction],
      balance:
        type === TYPE.deposit
          ? prevState.balance + value
          : prevState.balance - value
    }));
  };
  setTransaction = (amount, type) => ({
    id: uuidv1(),
    type,
    amount,
    date: new Date().toLocaleString()
  });
  incomeExpenses = (transactions, type) => {
    return transactions.length
      ? transactions
          .filter(transaction => transaction.type === TYPE[type])
          .reduce((acc, transaction) => acc + transaction.amount, 0)
      : 0;
  };
  render() {
    const { transactions, balance } = this.state;
    const income = this.incomeExpenses(transactions, TYPE.deposit);
    const expenses = this.incomeExpenses(transactions, TYPE.withdraw);
    return (
      <>
        <div className={styles.dashboard}>
          <Controls
            onTransaction={this.handleTransaction}
          />
          <Balance balance={balance} income={income} expenses={expenses} />
          {transactions.length > 0 && (
            <TransactionHistory items={transactions} />
          )}
          <ToastContainer />
        </div>
      </>
    );
  }
}
export default Dashboard;
