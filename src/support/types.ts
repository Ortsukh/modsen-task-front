

  export type BaseNoteType = {
    title: string;
    description: string;
    tags: string;
    order: number;
    color: 'blue'|'pink'|'orange'|"yellow"|'green'|'violet'
  };  

  export type NoteType = BaseNoteType & {
    id: string;
    updatedDate: string;
  };
  
