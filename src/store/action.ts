import {createAction} from '@reduxjs/toolkit';
import {Offer, City} from '../types/offer-types';

export const changeCity = createAction<City>('changeCity');

export const getSortedOffers = createAction<City>('getSortedOffers');

export const getFilteredOffers = createAction<string>('getFilteredOffers');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const offersLoadingStatus = createAction<boolean>('offersLoadingStatus');
