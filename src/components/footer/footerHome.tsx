import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./footer.module.css"

type HeaderProps= {
    onClick: (isHome:boolean) => void;
     isHomeActivate: boolean
}

const FooterHome = ({onClick, isHomeActivate} : HeaderProps )=> {
    
    return (
        <div className={styles.footer}> 
      
        <Link className={`${styles.link} ${isHomeActivate ? "" : styles.active}`}to="/notes" onClick={()=>onClick(false)}>Notes</Link>
     
        </div>
   
    )
}

export default FooterHome