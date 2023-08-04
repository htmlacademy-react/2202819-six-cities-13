import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {Offer} from '../types/offer-types';
import {changeCity, getSortedOffers} from '../store/action';

type InitialState = {
  city: string;
  offers: Offer[];
  sortOffers: Offer[];
}

const initialState: InitialState = {
  city: 'Paris',
  offers,
  sortOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getSortedOffers, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload);
    });
});

export {reducer};
