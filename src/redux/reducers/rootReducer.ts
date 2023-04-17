import { createReducer, createAction } from '@reduxjs/toolkit';

const initalState = {
  count: 0,
  notes: [],
  user: {},
  authStatus: '',
  loginStatus: false,
};

export const signedIn: any = createAction('login/signedIn');
export const signInUser: any = createAction('user/signIn');
export const changeNote: any = createAction('note/change');

export const rootReducer = createReducer(initalState, {
  [signInUser]: (state: any, action: any) => {
    state.notes = action.payload.notes;
    state.user = action.payload.user;
    state.authStatus = action.payload.authStatus;
  },

  [signedIn]: (state: any, action: any) => {
    state.loginStatus = action.loginStatus;
  },

  [changeNote]: (state: any, action: any) => {
    state.notes = action.payload;
  },
});
