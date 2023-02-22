import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { colors } from "../../assets/color";
import { createNote } from "../../support/api-bff";
import { NoteType } from "../../support/types";
import ModalContextMenu from "../modals/modalContextMenu";
import styles from "./note.module.css";

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

  const titleChangeHandler = (event: any) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        title: event.target.value,
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

  const findAndRemoveHashtag = (
    description: string,
    splitItem: string
  ): string => {
    return description
      .split(splitItem)
      .map((word) => {
        if (word.includes("\n")) {
          return findAndRemoveHashtag(word, "\n");
        }
        if (word.startsWith("#")) {
          setNoteObject((prev) => {
            if (prev.tags.search(new RegExp(`(^|\\s)${word}(?=\\W|$)`)) < 0) {
              return {
                ...prev,
                tags: `${prev.tags} ${word}`,
              };
            }
            return prev;
          });
          return word.slice(1);
        }
        return word;
      })
      .join(splitItem);
  };

  const descriptionChangeHandler = (event: any) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        description: event.target.value,
      };
    });
  };
  return (
    <div
      className={`${styles.note} ${styles[noteObject.color]}`}
      onContextMenu={openContextMenu}
    >
      <div
        onBlur={(e) => {
          if (contextMenu.isActive) return;
          if (!e.currentTarget.contains(e.relatedTarget)) {
            timeChangeHandler();
            setNoteObject((prev) => {
              return {
                ...prev,
                description: findAndRemoveHashtag(noteObject.description, " "),
              };
            });
            setCanCreate(true);
          }
        }}
      >
        <input
          className={styles.note_title}
          value={noteObject.title}
          autoFocus
          onChange={titleChangeHandler}
        />
        <textarea
          wrap="hard"
          cols={45}
          className={styles.note_description}
          value={noteObject.description}
          onChange={descriptionChangeHandler}
        />
        <span className={styles.note_time}>
          {
            <div className={styles.note_time}>
              {format(new Date(), "yyyy-MM-dd").toLocaleString()}
            </div>
          }
        </span>
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
    </div>
  );
};

export default NewNote;
