import React from "react";
import T from "prop-types";
import styles from "./TransactionHistory.module.css";

const TransactionHistory = ({ items }) => (
  <table className={styles.history}>
    <thead>
      <tr className={styles.tableHeading}>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => {
        const { id, type, amount, date } = item;
        return (
          <tr className={styles.tableRow} key={id}>
            <td>{type}</td>
            <td>{amount.toFixed(2)} $</td>
            <td>{date}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  items: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      type: T.string.isRequired,
      amount: T.number.isRequired,
      date: T.string.isRequired
    }).isRequired
  ).isRequired
};
export default TransactionHistory;
