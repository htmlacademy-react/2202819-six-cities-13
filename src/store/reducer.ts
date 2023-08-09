import {createReducer} from '@reduxjs/toolkit';
import {CityMap} from '../const';
import {Offer, City} from '../types/offer-types';
import {changeCity, getSortedOffers, getFilteredOffers, loadOffers, offersLoadingStatus} from '../store/action';

type InitialState = {
  city: City;
  offers: Offer[];
  sortOffers: Offer[];
  filterOffers: Offer[];
  loadingStatus: boolean;
}

const initialState: InitialState = {
  city: CityMap.Paris,
  offers: [],
  sortOffers: [],
  filterOffers: [],
  loadingStatus: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getSortedOffers, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload.name);
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
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(offersLoadingStatus, (state, action) => {
      state.loadingStatus = action.payload;
    });
});

export {reducer};
