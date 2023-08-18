import {createSelector} from '@reduxjs/toolkit';
import {OffersData, State} from '../../types/state-types';
import {NameSpace} from '../../const';

export const getOffers = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.offers,
);

export const getOffersFetchingStatus = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.fetchingStatusOffers,
);

export const getActiveCity = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.activeCity,
);
