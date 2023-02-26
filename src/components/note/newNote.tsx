import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { colors } from "../../assets/color";
import { createNote } from "../../support/api-bff";
import { NoteType } from "../../support/types";
import ModalContextMenu from "../modals/modalContextMenu";
import styles from "./note.module.css";
import NoteForm from "./noteForm";

export type NoteProps = {
  handleUpdateNotes: () => void;
  onChangeActiveNewForm: (status: boolean) => void;
  color: "blue" | "pink" | "orange" | "yellow" | "green" | "violet";
};

const NewNote = ({
  handleUpdateNotes,
  onChangeActiveNewForm,
  color,
}: NoteProps) => {
  const [noteObject, setNoteObject] = useState<NoteType>({
    id: "",
    title: "",
    description: "",
    updatedDate: "",
    tags: "",
    order: 0,
    color: colors[color].nextColor,
  });
  const [canCreate, setCanCreate] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    isActive: false,
    top: "",
    left: "",
  });

  const saveNewNode = () => {
    setCanCreate(true);
  };

  const openContextMenu = (event: any) => {
    event.preventDefault();
    setContextMenu({
      isActive: true,
      left: event.pageX,
      top: event.pageY,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({
      isActive: false,
      left: "",
      top: "",
    });
  };

  useEffect(() => {
    if (canCreate === true) {
      createNote(noteObject).then(() => {
        onChangeActiveNewForm(false);
        handleUpdateNotes();
      });
    }
  }, [canCreate]);

  const titleChangeHandler = (value: string) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        title: value,
      };
    });
  };

  const colorChangeHandler = (
    color: "blue" | "pink" | "orange" | "yellow" | "green" | "violet"
  ) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        color: color,
      };
    });
  };

  const timeChangeHandler = () => {
    setNoteObject((prev) => {
      return {
        ...prev,
        updatedDate: new Date().toString(),
      };
    });
  };

  const tagsChangeHandler = (word: string) => {
    setNoteObject((prev) => {
      if (prev.tags.search(new RegExp(`(^|\\s)${word}(?=\\W|$)`)) < 0) {
        return {
          ...prev,
          tags: `${prev.tags} ${word}`.trim(),
          canUpdate: true,
        };
      }
      return prev;
    });
  };

  const descriptionChangeHandler = (value: string) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };

  return (
    <div
      className={`${styles.note} ${styles[noteObject.color]}`}
      onContextMenu={openContextMenu}
    >
      <NoteForm
        note={noteObject}
        isNewNote={true}
        tagsChangeHandler={tagsChangeHandler}
        contextMenu={contextMenu.isActive}
        descriptionChangeHandler={descriptionChangeHandler}
        titleChangeHandler={titleChangeHandler}
        timeChangeHandler={timeChangeHandler}
        activateEditForm={() => {}}
        saveUpdatedNode={saveNewNode}
      />
      {contextMenu.isActive && (
        <ModalContextMenu
          left={contextMenu.left}
          top={contextMenu.top}
          id={noteObject.id}
          closeContextMenu={closeContextMenu}
          colorChangeHandler={colorChangeHandler}
          removeNote={() => console.log(true)}
        />
      )}
    </div>
  );
};

export default NewNote;
