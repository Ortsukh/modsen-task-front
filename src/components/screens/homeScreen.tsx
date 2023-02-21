import React from "react";
import { Link } from "react-router-dom";
import styles from "./homeScreen.module.css";

const HomeScreen = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>Welcome</div>

      <div className={styles.footer}>
        <Link className={`${styles.link_note} `} to="/notesScreen" />
      </div>
    </div>
  );
};

export default HomeScreen;
