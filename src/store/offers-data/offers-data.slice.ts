import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RequestStatus, NameSpace, CityMap} from '../../const';
import {City} from '../../types/offer-types';
import {OffersData} from '../../types/state-types';
import {fetchOffersAction} from '../api-actions';

const initialState: OffersData = {
  offers: [],
  fetchingStatusOffers: RequestStatus.Unsent,
  activeCity: CityMap.Paris,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<City>) {
      state.activeCity = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.fetchingStatusOffers = RequestStatus.Pending;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.fetchingStatusOffers = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.fetchingStatusOffers = RequestStatus.Error;
      });
  },
});

export const {setActiveCity} = offersData.actions;
