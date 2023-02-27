import React, { useEffect, useState } from "react";
import { updateNote } from "../../support/api-bff";
import { NoteType } from "../../support/types";
import ModalContextMenu from "../modals/modalContextMenu";
import ModalHelper from "../modals/modalHelper";
import styles from "./note.module.css";
import { format } from "date-fns";
import NoteForm from "./noteForm";
import { useGlobalContext } from "../../context/globalContext";

type NoteProps = {
  note: NoteType;
  removeNote: (id: string) => void;
  handleUpdateTags: () => void;
  handleSecondNoteChangeOrder: (secondNote: NoteType) => void;
  handleFirstNoteChangeOrder: (firstNote: NoteType) => void;
  handleUpdateNotes:() => void;

};

const Note = ({
  note,
  removeNote,
  handleFirstNoteChangeOrder,
  handleSecondNoteChangeOrder,
  handleUpdateTags,
}: NoteProps) => {

  const [isEdit, setIsEdit] = useState(true);
  const [modalHelper, setModalHelper] = useState(false);
  const [noteObject, setNoteObject] = useState(note);
  const [mousePosition, setMousePosition] = useState({
    mouseInNote: false,
    posX: 0,
    posY: 0,
  });
  const { isMobile } = useGlobalContext()

  useEffect(() => {
    if(isMobile){
      setNoteObject({ ...note, canUpdate: true });
    }
  }, [note]);

  const [contextMenu, setContextMenu] = useState({
    isActive: false,
    top: "",
    left: "",
  });

  useEffect(() => {
    if (noteObject.canUpdate === true) {
      updateNote(noteObject).then(() =>{ handleUpdateTags()});
      setNoteObject((prev) => {
        return {
          ...prev,
          canUpdate: false,
        };
      });
    }
  }, [noteObject]);

  useEffect(() => {
    if (mousePosition.mouseInNote) {
      const timerId = setTimeout(() => {
        setModalHelper(true);
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [mousePosition]);

  const activateEditForm = (status: boolean) => {
    setIsEdit(status);
  };

  const saveUpdatedNode = () => {
    setNoteObject((prev) => {
      return {
        ...prev,
        canUpdate: true,
      };
    });
  };

  const titleChangeHandler = (value: string) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        title: value,
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

  const colorChangeHandler = (
    color: "blue" | "pink" | "orange" | "yellow" | "green" | "violet"
  ) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        color: color,
        canUpdate: true,
      };
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

  const removeTag = (event: any) => {
    
    setNoteObject((prev) => {
      return {
        ...prev,
        tags: prev.tags.replace(` ${event.target.textContent}`, "").replace(`${event.target.textContent}`, ""),
        canUpdate: true,
      };
    });
  };

  const findAndColorTags = (description: string, splitItem: string): string => {
    return description
      .split(splitItem)
      .map((word) => {
        if (word.includes("\n")) {
          return findAndColorTags(word, "\n");
        }
        if (
          noteObject.tags.search(new RegExp(`(^|\\s)#${word}(?=\\W|$)`)) >= 0
        ) {
          return `<span class=${styles.spanColor}>${word}</span>`;
        }
        return word;
      })
      .join(splitItem);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    noteObject: NoteType
  ) => {
    handleFirstNoteChangeOrder(noteObject);
    (event.target as HTMLDivElement).classList.add("note_drag__1tknI");
  };
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).classList.remove("note_drag__1tknI");
  };
  const handleDropOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragDrop = (
    event: React.DragEvent<HTMLDivElement>,
    secondNoteObject: NoteType
  ) => {
    event.preventDefault();
    handleSecondNoteChangeOrder(secondNoteObject);
  };

  const handleMouseOver = (event: any) => {
    event.preventDefault();
  };

  const handleMouseMove = (event: any) => {
    setModalHelper(false);
    setMousePosition((prev) => {
      return { ...prev, posX: event.pageX, posY: event.pageY };
    });
  };

  const handleMouseEnter = () => {
    setMousePosition((prev) => {
      return { ...prev, mouseInNote: true };
    });
  };

  const handleMouseLeave = () => {
    setMousePosition((prev) => {
      return { ...prev, mouseInNote: false };
    });
  };

  return (
    <>
      <div
        className={`${styles.note} ${styles[noteObject.color]}`}
        onContextMenu={openContextMenu}
        draggable
        onDragStart={(e) => handleDragStart(e, noteObject)}
        onDrop={(e) => handleDragDrop(e, noteObject)}
        onDragOver={handleDropOver}
        onDragEnd={handleDragEnd}
        onMouseOver={handleMouseOver}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isEdit ? (
          <div onClick={() => activateEditForm(false)}>
            <div className={styles.note_title}>{noteObject.title} </div>
            <div
              className={styles.note_description}
              dangerouslySetInnerHTML={{
                __html: `${findAndColorTags(noteObject.description, " ")}`,
              }}
            ></div>
          </div>
        ) : (
          <NoteForm
            isNewNote={false}
            note={noteObject}
            tagsChangeHandler={tagsChangeHandler}
            contextMenu={contextMenu.isActive}
            descriptionChangeHandler={descriptionChangeHandler}
            titleChangeHandler={titleChangeHandler}
            timeChangeHandler={timeChangeHandler}
            activateEditForm={activateEditForm}
            saveUpdatedNode={saveUpdatedNode}
          />
        )}

        <div className={styles.note_time}>
          {format(
            new Date(noteObject.updatedDate),
            "yyyy-MM-dd"
          ).toLocaleString()}
        </div>
        <div className={styles.note_tags} onClick={removeTag}>
          {noteObject.tags.split(" ").map((tag, index) => {
            return (
              <span key={tag + index} className={styles.note_tag}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      {contextMenu.isActive && (
        <ModalContextMenu
          left={contextMenu.left}
          top={contextMenu.top}
          id={noteObject.id}
          closeContextMenu={closeContextMenu}
          colorChangeHandler={colorChangeHandler}
          removeNote={removeNote}
        />
      )}
      {modalHelper && (
        <ModalHelper left={mousePosition.posX} top={mousePosition.posY} />
      )}
    </>
  );
};
export default Note;
