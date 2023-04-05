import { createReducer, createAction } from '@reduxjs/toolkit';

const initalState = {
  count: 0,
  notes: [],
};

export const defaultData: any = createAction('default/data');
export const changeNote: any = createAction('note/change');

export const rootReducer = createReducer(initalState, {
  [defaultData]: (state: any, action: any) => {
    state.notes = action.payload;
  },

  [changeNote]: (state: any, action: any) => {
    state.notes = action.payload;
  },
});
