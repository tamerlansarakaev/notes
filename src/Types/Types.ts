export interface INote {
  id: string | number;
  title: string;
  description: string;
}

export interface INotesList {
  notes: INote;
  changeNotes: (e: INote) => void;
}
