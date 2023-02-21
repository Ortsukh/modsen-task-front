import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import NoteEmpty from "../components/note/emptyNote";
import Note from "../components/note/note";
import { changeOrder, getAllNotes, getAllTags, getNotesByTags, removeNoteById } from "../support/api-bff";
import styles from "./styles/notes.page.module.css";
import NewNote from "../components/note/newNote";
import Search from "../components/search/search";
import { NoteType } from "../support/types";
import AllTags from "../components/search/allTags";

const NotesPage = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newNoteActive, setNewNoteActive] = useState(false);
  const [canSwapNote, setCanSwapNote] = useState(false);
  const [updateNotes, setUpdateNotes] = useState(false);

  const [
    firstNoteOrderChange,
    setFirstNoteOrderChange,
  ] = useState<NoteType | null>();
  const [
    secondNoteOrderChange,
    setSecondNoteOrderChange,
  ] = useState<NoteType | null>();

  useEffect(() => {
    getAllTags().then((data) => setTags(data));
  }, [newNoteActive, updateNotes]);

  useEffect(() => {
    getAllNotes().then((data) => setNotes(data));
  }, [newNoteActive, updateNotes]);

  const filterNotesByTag = (tag: string) => {
    getNotesByTags(tag).then((data) => setNotes(data));
  }

  const activateNewNoteForm = (status: boolean) => {
    setNewNoteActive(status);
  };

  useEffect(() => {
    if (canSwapNote === true && firstNoteOrderChange && secondNoteOrderChange) {
      changeNoteOrder(firstNoteOrderChange, secondNoteOrderChange);
      setCanSwapNote(false);
    }
  }, [canSwapNote]);

  const removeNote = (id: string) => {
    removeNoteById(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleFirstNoteChangeOrder = (note: NoteType) => {
    setFirstNoteOrderChange(note);
  };

  const handleSecondNoteChangeOrder = (note: NoteType) => {
    setSecondNoteOrderChange(note);
    setCanSwapNote(true);
  };

  const changeNoteOrder = (firstNote: NoteType, secondNote: NoteType) => {
    changeOrder(firstNote.id, secondNote.id).then(() =>
      setUpdateNotes((prev) => !prev)
    );
  };

  return (
    <div className={styles.notes_page}>
      <Search filterNotesByTag={filterNotesByTag}/>
      <AllTags tags={tags}/>
      <div className={styles.notes}>
        <NoteEmpty onClick={() => activateNewNoteForm(true)} />
        
        {notes.map((note: NoteType, index: number) => (
          <Note
            note={note}
            key={note.id}
            removeNote={removeNote}
            handleFirstNoteChangeOrder={handleFirstNoteChangeOrder}
            handleSecondNoteChangeOrder={handleSecondNoteChangeOrder}
          />
        ))}
        {newNoteActive && (
          <NewNote
            onChangeActiveNewForm={activateNewNoteForm}
            color={notes.length > 1 ? notes[notes.length - 1].color : "blue"}
          />
        )}
      </div>
    </div>
  );
};

export default NotesPage;
