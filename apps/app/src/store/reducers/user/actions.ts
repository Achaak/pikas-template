import type { Session } from 'next-auth';
import { userActions } from '.';
import { store } from '../../store';
import type { UserState } from './types';

export const getUserState = (): UserState => store.getState().user;

export const setMe = ({ me }: { me: Session['user'] | null }): void => {
  store.dispatch(userActions.setMe(me));
};

export const updateImage = ({ image }: { image: string }): void => {
  store.dispatch(userActions.setImage(image));
};
export const updateName = ({ name }: { name: string }): void => {
  store.dispatch(userActions.setName(name));
};
export const updateEmail = ({ email }: { email: string }): void => {
  store.dispatch(userActions.setEmail(email));
};
