import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';

interface IModalReducer {
  modalStatus: boolean;
  modalType: string;
}

const initalState: IModalReducer = {
  modalStatus: false,
  modalType: '',
};

export const modalOpen: any = createAction('modal/open');
export const modalClose: any = createAction('modal/close');

export const modalReducer = createReducer<IModalReducer>(initalState, {
  [modalOpen]: (state: any, action: any) => {
    state.modalStatus = action.payload.modalStatus;
    state.modalType = action.payload.modalType;
  },
  [modalClose]: (state: any) => {
    state.modalStatus = false;
  },
});
