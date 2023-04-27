export interface INote {
  id: string | number;
  title: string;
  description: string;
  date?: number;
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
  notes?: INote[] | any;
}

export interface IRootReducer {
  rootReducer: {
    notes?: INote[];
    user?: IUser;
    authStatus?: 'Authorized' | 'Not Authorized' | '';
    loginStatus?: boolean;
    update: boolean;
  };
}

export interface IModalReducer {
  modalReducer: {
    modalStatus: boolean;
    modalType: string;
  };
}
