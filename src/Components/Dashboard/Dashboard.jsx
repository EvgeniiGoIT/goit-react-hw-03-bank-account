import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TYPE from '../../Constant/TYPE';
import MESSAGE from '../../Constant/MESSAGE';
import styles from './Dashboard.module.css';
import Controls from './../Controls/Controls';
import Balance from './../Balance/Balance';
import TransactionHistory from './../TransactionHistory/TransactionHistory';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };
  componentDidMount() {
    const persistedState = localStorage.getItem('state');
    if (persistedState) {
      this.setState(JSON.parse(persistedState));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }
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
          : prevState.balance - value,
    }));
  };
  setTransaction = (amount, type) => ({
    id: uuidv1(),
    type,
    amount,
    date: new Date().toLocaleString(),
  });
  incomeExpenses = transactions =>
    transactions.reduce(
      (acc, t) => {
        return { ...acc, [t.type]: t.amount + acc[t.type] };
      },
      { deposit: 0, withdraw: 0 },
    );
  render() {
    const { transactions, balance } = this.state;
    const { deposit, withdraw } = this.incomeExpenses(transactions);
    return (
      <>
        <div className={styles.dashboard}>
          <Controls onTransaction={this.handleTransaction} />
          <Balance balance={balance} income={deposit} expenses={withdraw} />
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
