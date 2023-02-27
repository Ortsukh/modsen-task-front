import React, { useEffect, useState } from "react";
import { updateNote } from "../../support/api-bff";
import { NoteType } from "../../support/types";
import ModalContextMenu from "../modals/modalContextMenu";
import ModalHelper from "../modals/modalHelper";
import styles from "./note.module.css";
import { format } from "date-fns";

type NoteProps = {
  note: NoteType;
  contextMenu: boolean;
  isNewNote: boolean;
  activateEditForm: (status: boolean) => void;
  tagsChangeHandler: (value: string) => void;
  timeChangeHandler: () => void;
  descriptionChangeHandler: (value: string) => void;
  titleChangeHandler: (value: string) => void;
  saveUpdatedNode: () => void;
};

const NoteForm = ({
  note,
  isNewNote,
  descriptionChangeHandler,
  saveUpdatedNode,
  timeChangeHandler,
  tagsChangeHandler,
  activateEditForm,
  contextMenu,
  titleChangeHandler,
}: NoteProps) => {

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
          tagsChangeHandler(word);
          return word.slice(1);
        }
        return word;
      })
      .join(splitItem);
  };

  const findAndColorTags = (description: string, splitItem: string): string => {
    return description
      .split(splitItem)
      .map((word) => {
        if (word.includes("\n")) {
          return findAndColorTags(word, "\n");
        }
        if (note.tags.search(new RegExp(`(^|\\s)#${word}(?=\\W|$)`)) >= 0) {
          return `<span class=${styles.spanColor}>${word}</span>`;
        }
        return word;
      })
      .join(splitItem);
  };

  return (
    <div
      onBlur={(e) => {
        if (contextMenu) return;

        if (!e.currentTarget.contains(e.relatedTarget)) {
          activateEditForm(true);
          descriptionChangeHandler(findAndRemoveHashtag(note.description, " "));
          timeChangeHandler();
          saveUpdatedNode();
        }
      }}
    >
      <input
        className={styles.note_title}
        value={note.title}
        autoFocus
        onChange={(event) => titleChangeHandler(event.target.value)}
      />
      <textarea
        wrap="hard"
        cols={45}
        className={styles.note_description}
        value={note.description}
        onChange={(event) => descriptionChangeHandler(event.target.value)}
      />
      {isNewNote && (
        <span className={styles.note_time}>
          {
            <div className={styles.note_time}>
              {format(new Date(), "yyyy-MM-dd").toLocaleString()}
            </div>
          }
        </span>
      )}
    </div>
  );
};
export default NoteForm;
