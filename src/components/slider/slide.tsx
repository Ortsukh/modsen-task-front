import React from "react";
import { NoteType } from "../../support/types";
import Note from "../note/note";
import styles from "./slider.module.css";



export default function Slide({ note } : {note: NoteType}) {
  return (
    <div className="slide">
    <Note
          note={note}
          removeNote={()=>{}}
          handleFirstNoteChangeOrder={()=>{}}
          handleSecondNoteChangeOrder={()=>{}}
    />
    </div>
  );
}