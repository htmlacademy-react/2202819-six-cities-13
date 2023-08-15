import {createAction} from '@reduxjs/toolkit';
import {AppRoute, AuthorizationStatus} from '../const';
import {City, Offer, DetailOffer} from '../types/offer-types';
import {Review} from '../types/review-types';

export const changeCity = createAction<City>('changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadDetailedOffer = createAction<DetailOffer>('data/loadDetailedOffer');

export const loadReviews = createAction<Review[]>('data/loadReviews');

export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');

export const addReview = createAction<Review>('review/addReview');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setDetailedOfferDataLoadingStatus = createAction<boolean>('data/setDetailedOfferDataLoadingStatus');

export const dropSendingStatus = createAction('review/dropSendingStatus');
