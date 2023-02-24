import React, { useContext } from "react";
import Slide from "./slide";

import { NoteType } from "../../support/types";
import styles from "./slider.module.css";
import NewNote from "../note/newNote";

type SliderProps = {
  notes: Array<NoteType>;
  slideNumber: number;
  newNoteActive: boolean;
  handleUpdateNotes: () => void;
  activateNewNoteForm: (status: boolean) => void;
};

export default function SlidesList({
  handleUpdateNotes,
  notes,
  slideNumber,
  newNoteActive,
  activateNewNoteForm,
}: SliderProps) {
  return (
    <div
      className={styles.slide_list}
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {newNoteActive && (
        <NewNote
          handleUpdateNotes={handleUpdateNotes}
          onChangeActiveNewForm={activateNewNoteForm}
          color={notes.length > 1 ? notes[notes.length - 1].color : "blue"}
        />
      )}

      {notes.map((slide, index) => (
        <Slide key={index} note={slide} />
      ))}
    </div>
  );
}
