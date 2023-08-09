import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppRoute, APIRoute, AuthorizationStatus} from '../const';
import {Offer} from '../types/offer-types';
import {AuthData} from '../types/auth-data-types';
import {UserData} from '../types/user-data-types';
import {AppDispatch, State} from '../types/state-types';
import {dropToken, saveToken} from '../services/token';
import {getSortedOffers, loadOffers, getoffersLoadingStatus, redirectToRoute, requireAuthorization} from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, getState, extra: api}) => {
    const {city} = getState();
    dispatch(getoffersLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(getoffersLoadingStatus(false));
    dispatch(loadOffers(data));
    dispatch(getSortedOffers(city));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
      await api.get(APIRoute.Login)
        .then(() => dispatch(requireAuthorization(AuthorizationStatus.Auth)))
        .catch(() => dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));
    }
  );

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({login: email, password}, {dispatch, extra: api}) => {
      const {data, status} = await api.post<UserData>(APIRoute.Login, {email, password});

      if (status >= 200 && status < 300) {
        saveToken(data.token);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(redirectToRoute(AppRoute.Main));
      }
    }
  );

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/logout',
    async(_arg, {dispatch, extra: api}) => {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(redirectToRoute(AppRoute.Login));
    }
  );
