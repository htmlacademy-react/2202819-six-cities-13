import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {Offer} from '../types/offer-types';
import {changeCity, getSortedOffers, getFilteredOffers} from '../store/action';

type InitialState = {
  city: string;
  offers: Offer[];
  sortOffers: Offer[];
  filterOffers: Offer[];
}

const initialState: InitialState = {
  city: 'Paris',
  offers,
  sortOffers: [],
  filterOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getSortedOffers, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload);
    })
    .addCase(getFilteredOffers, (state, action) => {
      switch (action.payload) {
        case 'high':
          state.sortOffers.sort((a, b) => a.price - b.price);
          break;
        case 'low':
          state.sortOffers.sort((a, b) => b.price - a.price);
          break;
        case 'top':
          state.sortOffers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filterOffers = state.sortOffers;
      }
      state.city = action.payload;
    });
});

export {reducer};
