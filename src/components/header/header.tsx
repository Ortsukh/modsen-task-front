import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

type HeaderProps = {
  onClick: (activeScreen: string) => void;
  activeScreen: string;
};

const Header = ({ onClick, activeScreen }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <Link
        className={`${styles.link} ${activeScreen === 'home' ? styles.active : ""}`}
        to="/home"
        onClick={() => onClick('home')}
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${activeScreen === "notes" ? styles.active : ""}`}
        to="/notes"
        onClick={() => onClick('notes')}
      >
        Notes
      </Link>
    </div>
  );
};

export default Header;
