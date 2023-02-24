import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../search/search";
import Slider from "../slider/slider";
import styles from "./homeScreen.module.css";

const NotesScreen = () => {
  const [newNoteActive, setNewNoteActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [searchTags, setSearchTags] = useState("");

  const activateNewNoteForm = (status: boolean) => {
    setNewNoteActive(status);
  };

  const activateMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const filterNotesByTag = (tag: string) => {
    setSearchTags(tag);
  };

  return (
    <div className={styles.wrapper}>
      <Slider
        newNoteActive={newNoteActive}
        activateNewNoteForm={activateNewNoteForm}
        searchTags={searchTags}
      />
      {menuActive && (
        <div className={styles.menu}>
          <Search filterNotesByTag={filterNotesByTag} />
        </div>
      )}
      <div className={styles.footer}>
        <Link className={`${styles.link_home}`} to="/" />
        <div
          className={`${
            menuActive ? styles.button_close_menu : styles.button_menu
          }`}
          onClick={() => activateMenu()}
        ></div>
        <div
          className={`${styles.button_new_note}`}
          onClick={() => activateNewNoteForm(true)}
        ></div>
      </div>
    </div>
  );
};

export default NotesScreen;
