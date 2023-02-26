import React, { useEffect, useState } from "react";

import SlidesList from "./slidesList";
import { getAllNotes, getNotesByTags, removeNoteById } from "../../support/api-bff";
import styles from "./slider.module.css";
import { NoteType } from "../../support/types";
import Search from "../search/search";
import ModalContextMenu from "../modals/modalContextMenu";

type SliderProps = {
  newNoteActive: boolean;
  activateNewNoteForm: (status: boolean) => void;
  menuActive: boolean;
};

const Slider = function({
  newNoteActive,
  activateNewNoteForm,
  menuActive,
}: SliderProps) {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [updateNotes, setUpdateNotes] = useState(false);
  const [upgradeColor, setUpgradeColor] = useState(false);

  const filterNotesByTag = (tag: string) => {
    getNotesByTags(tag)
      .then((data) => setNotes(data))
      .catch(() => {});
  };

  useEffect(() => {
    getAllNotes().then((data) => setNotes(data));
  }, [updateNotes]);

  const handleUpdateNotes = () => {
    setUpdateNotes((prev) => !prev);
  };

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = notes.length - 1;
    } else {
      slideNumber = (slide + direction) % notes.length;
    }

    setSlide(slideNumber);
  };

  useEffect(() => {
    setSlide(0);
  }, [newNoteActive]);

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: any) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };

  const removeNote = (id: string) => {
    removeNoteById(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const colorChangeHandler = (
    color: "blue" | "pink" | "orange" | "yellow" | "green" | "violet"
  ) => {
    setNotes((prev) => {
      return prev.map((note, index) => {
        if (index === slide) {
          return {
            ...note,
            color: color,
          };
        }
        return note;
      });
    });
    setUpgradeColor(true)
  };

  return (
    <>
      <div
        className={styles.slider}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <SlidesList
          handleUpdateNotes={handleUpdateNotes}
          notes={notes}
          slideNumber={slide}
          newNoteActive={newNoteActive}
          activateNewNoteForm={activateNewNoteForm}
        />
      </div>
      {menuActive && (
        <div className={styles.menu}>
          <Search filterNotesByTag={filterNotesByTag} />
          <ModalContextMenu
            left={"20"}
            top={"100"}
            id={notes[slide].id}
            closeContextMenu={() => {}}
            colorChangeHandler={colorChangeHandler}
            removeNote={removeNote}
          />
        </div>
      )}
    </>
  );
};

export default Slider;
