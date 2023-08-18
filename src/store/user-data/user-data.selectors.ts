import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {UserData, State} from '../../types/state-types';

export const getUser = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserData) => state.user,
);

export const getAuthorizationStatus = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserData) => state.authorizationStatus,
);
