import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import styles from "../styles/TodoItem.module.css";

const checkVariants = {
  initial: {
    color: "#cc9af0",
  },
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

const boxVariants = {
  checked: {
    background: "#1d0333",
    transition: { duration: 0.1 },
  },
  unchecked: { background: "#cc9af0", transition: { duration: 0.1 } },
};

const Checkbox = ({ checked, handleCheck }) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.div
      animate={checked ? "checked" : "unchecked"}
      className={styles.svgBox}
      variants={boxVariants}
      onClick={handleCheck}
    >
      <motion.svg
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <motion.path
          variants={checkVariants}
          animate={checked ? "checked" : "unchecked"}
          style={{pathLength, opacity}}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></motion.path>
      </motion.svg>
    </motion.div>
  );
};

export default Checkbox;
