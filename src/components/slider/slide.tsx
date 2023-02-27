import React, { useEffect, useState } from "react";
import { NoteType } from "../../support/types";
import Note from "../note/note";

export default function Slide({ note }: { note: NoteType }) {
  const [noteObject, setNote] = useState<NoteType>();

  useEffect(() => {
    setNote(note);
  }, [noteObject]);
  
  return (
    <div className="slide">
      <Note
        note={note}
        removeNote={() => {}}
        handleFirstNoteChangeOrder={() => {}}
        handleSecondNoteChangeOrder={() => {}}
        handleUpdateTags={() => {}}
        handleUpdateNotes={() => {}}
      />
    </div>
  );
}
