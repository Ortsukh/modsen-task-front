import React, { useEffect } from "react";
import styles from "./styles/home.page.module.css";

type ScreenProps = {
  activeScreen: (screen: string) => void;
};
const WelcomePage = ({ activeScreen }: ScreenProps) => {
    
  useEffect(() => {
    activeScreen("home");
  }, []);

  return <div className={styles.home_page}>WELCOME</div>;
};

export default WelcomePage;
