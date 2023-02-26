import React, { useEffect } from "react";
import { useState } from "react";
import NoteEmpty from "../components/note/emptyNote";
import Note from "../components/note/note";
import {
  changeOrder,
  getAllNotes,
  getAllTags,
  getNotesByTags,
  removeNoteById,
} from "../support/api-bff";
import styles from "./styles/notes.page.module.css";
import NewNote from "../components/note/newNote";
import Search from "../components/search/search";
import { NoteType } from "../support/types";
import AllTags from "../components/search/allTags";

type ScreenProps = {
  activeScreen: (screen: string) => void;
};

const NotesPage = ({ activeScreen }: ScreenProps) => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newNoteActive, setNewNoteActive] = useState(false);
  const [canSwapNote, setCanSwapNote] = useState(false);
  const [updateNotes, setUpdateNotes] = useState(false);
  const [updateTags, setUpdateTags] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [
    firstNoteOrderChange,
    setFirstNoteOrderChange,
  ] = useState<NoteType | null>();

  const [
    secondNoteOrderChange,
    setSecondNoteOrderChange,
  ] = useState<NoteType | null>();

  useEffect(() => {
    setIsLoading(true);
    if (updateTags === true) {
      getAllTags()
        .then((data) => {
          setTags(data);
          setIsLoading(false);
        })
        .catch(() => setIsError(true));
    }
  }, [updateTags]);

  useEffect(() => {
    activeScreen("notes");
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getAllNotes()
      .then((data) => {
        setNotes(data);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, [updateNotes]);

  useEffect(() => {
    if (canSwapNote === true && firstNoteOrderChange && secondNoteOrderChange) {
      changeNoteOrder(firstNoteOrderChange, secondNoteOrderChange);

      setCanSwapNote(false);
    }
  }, [canSwapNote]);

  const filterNotesByTag = (tag: string) => {
    getNotesByTags(tag)
      .then((data) => setNotes(data))
      .catch(() => setIsError(true));
  };

  const handleUpdateNotes = () => {
    setUpdateNotes((prev) => !prev);
  };

  const activateNewNoteForm = (status: boolean) => {
    setNewNoteActive(status);
    setUpdateTags(true);
  };

  const removeNote = (id: string) => {
    removeNoteById(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleUpdateTags = () => {
    setUpdateTags(true);
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
    <>
      {!isError && (
        <div className={styles.notes_page}>
          <Search filterNotesByTag={filterNotesByTag} />

          <AllTags tags={tags} />

          {!isLoading && (
            <div className={styles.notes}>
              <NoteEmpty onClick={() => activateNewNoteForm(true)} />

              {notes.map((note: NoteType) => (
                <Note
                  note={note}
                  key={note.id}
                  removeNote={removeNote}
                  handleFirstNoteChangeOrder={handleFirstNoteChangeOrder}
                  handleSecondNoteChangeOrder={handleSecondNoteChangeOrder}
                  handleUpdateTags={handleUpdateTags}
                />
              ))}

              {newNoteActive && (
                <NewNote
                  handleUpdateNotes={handleUpdateNotes}
                  onChangeActiveNewForm={activateNewNoteForm}
                  color={
                    notes.length > 1 ? notes[notes.length - 1].color : "blue"
                  }
                />
              )}
            </div>
          )}
          {isLoading && <div>Loading...</div>}
        </div>
      )}
      {isError && <div>Something went wrong. Sorry!</div>}
    </>
  );
};

export default NotesPage;
