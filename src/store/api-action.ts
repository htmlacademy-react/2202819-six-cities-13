import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../const';
import {Offer} from '../types/offer-types';
import {AppDispatch, State} from '../types/state-types';
import {getSortedOffers, loadOffers, offersLoadingStatus} from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchOffers',
  async (_arg, { dispatch, getState, extra: api}) => {
    const {city} = getState();
    dispatch(offersLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(offersLoadingStatus(false));
    dispatch(loadOffers(data));
    dispatch(getSortedOffers(city));
  });
