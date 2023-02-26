import React, { useEffect, useState } from "react";
import { NoteType } from "../../support/types";
import Note from "../note/note";

export default function Slide({ note }: { note: NoteType }) {
  const [note1, setNote] = useState<NoteType>();

  useEffect(() => {
    setNote(note);
  }, [note1]);
  return (
    <div className="slide">
      <Note
        note={note}
        removeNote={() => {}}
        handleFirstNoteChangeOrder={() => {}}
        handleSecondNoteChangeOrder={() => {}}
        handleUpdateTags={() => {}}
      />
    </div>
  );
}
