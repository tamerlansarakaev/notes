export interface INote {
  id: string | number;
  title: string;
  description: string;
}

export interface INotesList {
  rootReducer: {
    notes: INote[];
  };
  changeNotes?: (e: INote) => void;
}

export interface IUser {
  email?: string;
  id?: string;
  notes?: INote[];
}

export interface IRootReducer {
  rootReducer: {
    notes?: INote[];
    user?: IUser;
    authStatus?: 'Authorized' | 'Not Authorized' | '';
    loginStatus?: boolean;
  };
}
