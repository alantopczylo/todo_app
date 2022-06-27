import React from "react";
import styles from "../styles/PageTitle.module.css";

const PageTitle = ({ children, ...rest }) => {
  return (
    <h1 className={styles.title} {...rest}>
      {children}
    </h1>
  );
};

export default PageTitle;
