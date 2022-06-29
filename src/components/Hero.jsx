import React from "react";
import styles from "../styles/Hero.module.css";
const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <img src="./assets/martina.png" alt="" className={styles.img} />
      <div className={styles.texts}>
        <h3 className={styles.title}>Welcome to <span>TASK IT</span> </h3>
        <p className={styles.paragraph}>
          Task It will helps you to stay organized and perform your task much
          faster.
        </p>
      </div>
    </div>
  );
};

export default Hero;
