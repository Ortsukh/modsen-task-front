import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./homeScreen.module.css"

type HeaderProps= {
    onClick: (isHome:boolean) => void;
     isHomeActivate: boolean
}

const HomeScreen = ( )=> {
    
    return (
        <div className={styles.wrapper}>
        <div className={styles.content}>Welcome</div>

        <div className={styles.footer}> 
        <Link className={`${styles.link_note} `}to="/notesScreen" > </Link>
     
        </div>
        </div>
   
    )
}

export default HomeScreen