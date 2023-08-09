import {createAction} from '@reduxjs/toolkit';
import {City, Offer} from '../types/offer-types';
import {AppRoute, AuthorizationStatus} from '../const';

export const changeCity = createAction<City>('changeCity');

export const getSortedOffers = createAction<City>('getSortedOffers');

export const getFilteredOffers = createAction<string>('getFilteredOffers');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const getoffersLoadingStatus = createAction<boolean>('getoffersLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
