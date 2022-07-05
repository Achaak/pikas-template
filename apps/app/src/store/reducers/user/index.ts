import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import { initialUserState } from './state';

export * from './selects';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: reducers,
});

export const userActions = userSlice.actions;
