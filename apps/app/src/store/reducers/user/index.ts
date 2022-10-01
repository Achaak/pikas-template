import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-namespace
import * as reducers from './reducers';
import { initialUserState } from './state';

export * from './selects';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers,
});

export const userActions = userSlice.actions;
