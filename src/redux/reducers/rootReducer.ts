import { createReducer, createAction } from '@reduxjs/toolkit';
import { types } from '../types';
import { INote, IUser } from '../../Types/Types';

type RootReducer = {
  notes: INote[];
  user: IUser;
  authStatus: string;
  update: boolean;
  loginStatus: boolean;
};

const initialState: RootReducer = {
  notes: [],
  user: {},
  authStatus: '',
  update: true,
  loginStatus: false,
};

export const logIn: any = createAction(types.logIn);
export const signInUser: any = createAction(types.userSignIn);
export const signOutUser: any = createAction(types.userSignOut);
export const updateData: any = createAction(types.updateDataStatus);

export const changeNote: any = createAction('note/change');

export const rootReducer: any = createReducer(initialState, (builder) => {
  builder
    .addCase(signInUser, (state: RootReducer, action: any) => {
      state.notes = action.payload.notes;
      state.user = action.payload.user;
      state.update = false;
      state.authStatus = action.payload.authStatus;
    })

    .addCase(logIn, (state: RootReducer, action: any) => {
      state.loginStatus = action.loginStatus;
    })
    .addCase(signOutUser, (state: RootReducer) => {
      state.authStatus = 'Not Authorized';
      state.loginStatus = false;
    })
    .addCase(changeNote, (state: RootReducer, action) => {
      state.notes = action.payload;
    })
    .addCase(updateData, (state: RootReducer) => {
      state.update = true;
    });
});
