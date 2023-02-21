import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

type HeaderProps = {
  onClick: (isHome: boolean) => void;
  isHomeActivate: boolean;
};

const Header = ({ onClick, isHomeActivate }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <Link
        className={`${styles.link} ${isHomeActivate ? styles.active : ""}`}
        to="/home"
        onClick={() => onClick(true)}
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${isHomeActivate ? "" : styles.active}`}
        to="/notes"
        onClick={() => onClick(false)}
      >
        Notes
      </Link>
    </div>
  );
};

export default Header;
