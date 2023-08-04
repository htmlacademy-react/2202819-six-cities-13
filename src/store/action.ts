import {createAction} from '@reduxjs/toolkit';

export const changeCity = createAction<string>('changeCity');

export const getSortedOffers = createAction<string>('getSortedOffers');

export const getFilteredOffers = createAction<string>('getFilteredOffers');
