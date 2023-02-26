import { BaseNoteType, NoteType } from "./types";
import dotenv from "dotenv";

dotenv.config();

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function getAllNotes() {
  const str = `${backendUrl}notes`;
  let res = await fetch(str, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!res.ok) {
    throw new Error("Something went wrong.Sorry");
  }

  return await res.json();
}

export async function getAllTags() {
  const str = `${backendUrl}notes/all-tags`;
  let res = await fetch(str, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!res.ok) {
    throw new Error("Something went wrong.Sorry");
  }

  return await res.json();
}

export async function getNotesByTags(tag: string) {
  const str = `${backendUrl}notes/tags?tags=${tag}`;
  let res = await fetch(str, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return await res.json();
}

export async function updateNote(note: NoteType) {
  const body = {
    title: note.title,
    description: note.description,
    tags: note.tags,
    color: note.color,
  };
  const str = `${backendUrl}notes/${note.id}`;
  let res = await fetch(str, {
    method: "put",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
}

export async function createNote(note: BaseNoteType) {
  const body = {
    title: note.title,
    description: note.description,
    tags: note.tags,
    color: note.color,
  };
  const str = `${backendUrl}notes`;
  let res = await fetch(str, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
}

export async function removeNoteById(id: string) {
  const str = `${backendUrl}notes/${id}`;
  let res = await fetch(str, {
    method: "delete",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return await res.json();
}

export async function changeOrder(firstId: string, secondId: string) {
  const body = {
    firstNoteId: firstId,
    secondNoteId: secondId,
  };
  const str = `${backendUrl}notes/order`;
  let res = await fetch(str, {
    method: "put",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
}
