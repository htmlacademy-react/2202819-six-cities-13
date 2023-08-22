import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userData} from './user-data/user-data.slice';
import {offersData} from './offers-data/offers-data.slice';
import {offerData} from './offer-data/offer-data.slice';
import {reviewsData} from './reviews-data/reviews-data.slice';
import {nearbyData} from './nearby-data/nearby-data.slice';
import {favoritesData} from './favorites-data/favorites-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.NearPlaces]: nearbyData.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
});
