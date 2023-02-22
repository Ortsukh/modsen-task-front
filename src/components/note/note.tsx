import React, { useEffect, useState } from "react";
import { updateNote } from "../../support/api-bff";
import { NoteType } from "../../support/types";
import ModalContextMenu from "../modals/modalContextMenu";
import ModalHelper from "../modals/modalHelper";
import styles from "./note.module.css";
import { format } from "date-fns";

type NoteProps = {
  note: NoteType;
  removeNote: (id: string) => void;
  handleSecondNoteChangeOrder: (secondNote: NoteType) => void;
  handleFirstNoteChangeOrder: (firstNote: NoteType) => void;
};

const Note = ({
  note,
  removeNote,
  handleFirstNoteChangeOrder,
  handleSecondNoteChangeOrder,
}: NoteProps) => {
  const [isEdit, setIsEdit] = useState(true);
  const [modalHelper, setModalHelper] = useState(false);
  const [noteObject, setNoteObject] = useState(note);
  const [mousePosition, setMousePosition] = useState({
    mouseInNote: false,
    posX: 0,
    posY: 0,
  });

  const [contextMenu, setContextMenu] = useState({
    isActive: false,
    top: "",
    left: "",
  });

  const [canUpdate, setCanUpdate] = useState(false);

  useEffect(() => {
    if (noteObject.canUpdate === true) {
      updateNote(noteObject);
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

  const activateEditForm = (status: boolean, data?: any) => {
    setIsEdit(status);
  };

  const titleChangeHandler = (event: any) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        title: event.target.value,
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
    setCanUpdate(true);
  };

  const descriptionChangeHandler = (event: any) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        description: event.target.value,
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
            console.log(prev);
            
            if (prev.tags.search(new RegExp(`(^|\\s)${word}(?=\\W|$)`)) < 0) {
                console.log(word);
                
              return {
                ...prev,
                tags: `${prev.tags} ${word}`.trim(),
                canUpdate: true,
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

  const removeTag = (event: any) => {
    setNoteObject((prev) => {
      return {
        ...prev,
        tags: prev.tags.replace(event.target.textContent, ""),
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

  const handleDragStart = (event: any, noteObject: NoteType) => {
    handleFirstNoteChangeOrder(noteObject);
  };

  const handleDropOver = (event: any) => {
    event.preventDefault();
  };

  const handleDragDrop = (event: any, secondNoteObject: NoteType) => {
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

  const handleMouseEnter = (event: any) => {
    setMousePosition((prev) => {
      return { ...prev, mouseInNote: true };
    });
  };

  const handleMouseLeave = (event: any) => {
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
          <div
            onBlur={(e) => {
              if (contextMenu.isActive) return;

              if (!e.currentTarget.contains(e.relatedTarget)) {
                activateEditForm(true);
                setNoteObject((prev) => {
                  return {
                    ...prev,
                    description: findAndRemoveHashtag(
                      noteObject.description,
                      " "
                    ),
                  };
                });
                timeChangeHandler();
                setCanUpdate(true);
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
          </div>
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
