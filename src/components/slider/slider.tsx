import React, { useEffect, useState } from "react";

import SlidesList from "./slidesList";
import { getAllNotes, getNotesByTags } from "../../support/api-bff";
import styles from "./slider.module.css";
import { NoteType } from "../../support/types";

type SliderProps = {
  newNoteActive: boolean;
  activateNewNoteForm: (status: boolean) => void;
  searchTags: string
};

const Slider = function({ newNoteActive, activateNewNoteForm, searchTags }: SliderProps) {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    getNotesByTags(searchTags).then((data) => setNotes(data));
}, [searchTags]);

  useEffect(() => {
    getAllNotes().then((data) => setNotes(data));
  }, [newNoteActive]);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = notes.length - 1;
    } else {
      slideNumber = (slide + direction) % notes.length;
    }

    setSlide(slideNumber);
  };

 useEffect(()=>{
    setSlide(0)
 },[newNoteActive])


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

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <SlidesList notes={notes} slideNumber={slide} newNoteActive={newNoteActive} activateNewNoteForm={activateNewNoteForm} />
    </div>
  );
};

export default Slider;
