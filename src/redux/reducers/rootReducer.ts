import { createReducer, createAction } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  notes: [],
  user: {},
  authStatus: '',
  loginStatus: false,
};

export const signedIn: any = createAction('login/signedIn');
export const signInUser: any = createAction('user/signIn');
export const signOutUser: any = createAction('user/signOut');

export const changeNote: any = createAction('note/change');

export const rootReducer: any = createReducer(initialState, (builder) => {
  builder
    .addCase(signInUser, (state: any, action: any) => {
      state.notes = action.payload.notes;
      state.user = action.payload.user;
      state.authStatus = action.payload.authStatus;
    })
    .addCase(signedIn, (state, action: any) => {
      state.loginStatus = action.loginStatus;
    })
    .addCase(signOutUser, (state) => {
      state.authStatus = 'Not Authorized';
      state.loginStatus = false;
    })
    .addCase(changeNote, (state: any, action) => {
      state.notes = action.payload;
    });
});
