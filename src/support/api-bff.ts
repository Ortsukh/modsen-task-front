import { BaseNoteType, NoteType,  } from "./types";

export async function getAllNotes() {
    const str = `http://localhost:3005/notes`;
    let res = await fetch(str, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

    return await res.json();
  }

  export async function getAllTags() {
    const str = `http://localhost:3005/notes/all-tags`;
    let res = await fetch(str, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

    return await res.json();
  }

  export async function getNotesByTags(tag: string) {
    const str = `http://localhost:3005/notes/tags?tags=${tag}`;
    let res = await fetch(str, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

    return await res.json();
  }

  export async function updateNote(note:NoteType) {
    const body = {
      "title": note.title,
      "description": note.description,
      "tags": note.tags,
      "color": note.color

    }
    const str = `http://localhost:3005/notes/${note.id}`;
    let res = await fetch(str, {
      method: "put",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });

    return await res.json();
  }

  export async function createNote(note:BaseNoteType) {
    const body = {
      "title": note.title,
      "description": note.description,
      "tags": note.tags,
      "color": note.color
    }
    const str = `http://localhost:3005/notes`;
    let res = await fetch(str, {
      method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });

    return await res.json();
  }

  export async function removeNoteById(id:string) {
   
    const str = `http://localhost:3005/notes/${id}`;
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
      secondNoteId: secondId
    }
    const str = `http://localhost:3005/notes/order`;
    let res = await fetch(str, {
      method: "put",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
          
      });

    return await res.json();
  }