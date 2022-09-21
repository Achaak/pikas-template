import type { UserState } from './types';
import type { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import type { Session } from 'next-auth';

export const setMe: CaseReducer<
  UserState,
  PayloadAction<Session['user'] | null>
> = (state, action): void => {
  state.me = action.payload;
};

export const setImage: CaseReducer<UserState, PayloadAction<string>> = (
  state,
  action
): void => {
  if (!state.me) {
    return;
  }
  state.me.image = action.payload;
};

export const setName: CaseReducer<UserState, PayloadAction<string>> = (
  state,
  action
): void => {
  if (!state.me) {
    return;
  }
  state.me.name = action.payload;
};

export const setEmail: CaseReducer<UserState, PayloadAction<string>> = (
  state,
  action
): void => {
  if (!state.me) {
    return;
  }
  state.me.email = action.payload;
};
