import type { TypedUseSelectorHook } from 'react-redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const StoreProvider = Provider;
