import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppRoute, APIRoute, AuthorizationStatus} from '../const';
import {Offer, DetailOffer} from '../types/offer-types';
import {Review, ReviewData} from '../types/review-types';
import {AuthData} from '../types/auth-data-types';
import {UserData} from '../types/user-data-types';
import {AppDispatch, State} from '../types/state-types';
import {dropToken, saveToken} from '../services/token';
import {loadOffers, loadDetailedOffer, loadReviews, loadOffersNearby, addReview, redirectToRoute, requireAuthorization, setOffersDataLoadingStatus, setDetailedOfferDataLoadingStatus} from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setDetailedOfferDataLoadingStatus(true));
    const {data: dataOffer} = await api.get<DetailOffer>(`${APIRoute.Offers}/${id}`);
    const {data: dataReviews} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    const {data: dataOfferNearby} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setDetailedOfferDataLoadingStatus(false));
    dispatch(loadDetailedOffer(dataOffer));
    dispatch(loadReviews(dataReviews));
    dispatch(loadOffersNearby(dataOfferNearby));
  }
);

export const postReview = createAsyncThunk<void, {reviewData: ReviewData; id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/postReview',
  async ({reviewData, id}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Comments}/${id}`, reviewData);
    dispatch(addReview(data));
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
