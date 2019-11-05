import React, { Component } from "react";
import T from "prop-types";
import TYPE from "../../Constant/TYPE";
import styles from "./Controls.module.css";

class Controls extends Component {
  static propTypes = {
    onTransaction: T.func.isRequired
  };
  state = {
    value: ""
  };
  saveInputValue = e => {
    const value = e.currentTarget.value;
    this.setState({ value });
  };
  sendTransaction = (transaction, type) => {
    const { value } = this.state;
    transaction(+value, type);
    this.setState({ value: "" });
  };
  render() {
    const { onTransaction } = this.props;
    const { value } = this.state;
    return (
      <section className={styles.controls}>
        <input
          className={styles.input}
          type="number"
          name="amount"
          value={value}
          onChange={this.saveInputValue}
        />
        <button
          className={styles.button}
          type="button"
          onClick={() => this.sendTransaction(onTransaction, TYPE.deposit)}
        >
          Deposit
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={() => this.sendTransaction(onTransaction, TYPE.withdraw)}
        >
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
