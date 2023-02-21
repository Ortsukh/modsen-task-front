import React from "react";
import styles from "./note.module.css";

 type NoteProps = {
  onClick: () => void;
};

const NoteEmpty = ({ onClick }: NoteProps) => {
  return (
    <div className={styles.note_empty} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.circle}>
          <div className={styles.plus}></div>
        </div>
      </div>
    </div>
  );
};

export default NoteEmpty;
