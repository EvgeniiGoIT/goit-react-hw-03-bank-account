import React from "react";
import T from "prop-types";
import styles from "./Balance.module.css";

const Balance = ({income, expenses, balance}) => {
  const fixedNumber = number => number.toFixed(2);
    return (
    <section className={styles.balance}>
      <span className={styles.income}>
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          ⬆️
        </span>
        {fixedNumber(income)} $
      </span>
      <span className={styles.expenses}>
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          ⬇️
        </span>
        {fixedNumber(expenses)} $
      </span>
      <span className={styles.balance__text}>Balance: {fixedNumber(balance)} $</span>
    </section>
  );
};

Balance.propTypes = {
  balance: T.number.isRequired,
  income: T.number.isRequired,
  expenses: T.number.isRequired
};
export default Balance;
