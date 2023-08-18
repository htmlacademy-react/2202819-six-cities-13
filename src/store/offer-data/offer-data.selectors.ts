import {createSelector} from '@reduxjs/toolkit';
import {OfferData, State} from '../../types/state-types';
import {NameSpace} from '../../const';

export const getOffer = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: OfferData) => state.offer,
);

export const getOfferFetchingStatus = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: OfferData) => state.fetchingStatusOffer,
);
