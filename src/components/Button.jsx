import React from "react";
import styles from "../styles/Button.module.css";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const Button = ({ children, variant, type, ...rest }) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      {...rest}
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
    >
      {children}
    </button>
  );
};

const SelectButton = ({ children, ...rest }) => {
  return (
    <select
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export { SelectButton };
export default Button;
