import React, { useEffect } from "react";
import { useState } from "react";
import NoteEmpty from "../components/note/emptyNote";
import Note from "../components/note/note";
import {
  changeOrder,
  getAllTags,
  getLastNote,
  getNotesByTags,
  getPageNotes,
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
  const [lastNote, setLastNote] = useState<NoteType>();
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [countNotes, setCountNotes] = useState(0);
  const [newNoteActive, setNewNoteActive] = useState(false);
  const [canSwapNote, setCanSwapNote] = useState(false);
  const [updateNotes, setUpdateNotes] = useState(false);
  const [updateTags, setUpdateTags] = useState(false);
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
    getAllTags()
      .then((data) => {
        setTags(data);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, [updateTags]);

  useEffect(() => {
    getLastNote()
      .then((data) => {
        setLastNote(data[0]);
      })
      .catch(() => setIsError(true));
  }, [notes]);

  useEffect(() => {
    activeScreen("notes");
  }, []);

  useEffect(() => {
    if (page > 2) {
      setIsLoading(true);
      getPageNotes(page)
        .then((data) => {
          setNotes((prev) => [...prev, ...data.notes]);
          setCountNotes(data.count);
          setIsLoading(false);
        })
        .catch(() => setIsError(true));
      setUpdateNotes(false);
    }
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    getPageNotes(1)
      .then((data) => {
        setNotes(data.notes);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, [updateNotes]);

  useEffect(() => {
    if (canSwapNote === true && firstNoteOrderChange && secondNoteOrderChange) {
      changeNoteOrder(firstNoteOrderChange, secondNoteOrderChange);
      handleUpdateTags();
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
    setUpdateTags((prev) => !prev);
  };

  const removeNote = (id: string) => {
    removeNoteById(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleUpdateTags = () => {
    console.log("set");

    setUpdateTags((prev) => !prev);
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

  const onScroll = (event: any) => {
    const scrollLeft = event.currentTarget.scrollLeft;
    const scrollWidth = event.currentTarget.scrollWidth;
    const clientWidth = event.currentTarget.clientWidth;

    if (scrollLeft + clientWidth >= scrollWidth - 100) {
      if (page * 5 < countNotes) setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      {!isError && (
        <div className={styles.notes_page}>
          <Search filterNotesByTag={filterNotesByTag} />

          <AllTags tags={tags} />

          {!isLoading && (
            <div className={styles.notes} onScroll={onScroll}>
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
                  color={lastNote ? lastNote.color : "blue"}
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
