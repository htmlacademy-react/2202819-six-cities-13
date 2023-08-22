import {store} from '../store';
import {AuthorizationStatus, RequestStatus} from '../const';
import {Review} from './review-types';
import {AuthorizedUser} from './user-data-types';
import {City, Offer, DetailOffer} from './offer-types';

export type UserData = {
  user: AuthorizedUser | null;
  authorizationStatus: AuthorizationStatus;
  sendingStatusLogin: RequestStatus;
}

export type OffersData = {
  offers: Offer[];
  fetchingStatusOffers: RequestStatus;
  activeCity: City;
}

export type OfferData = {
  offer: DetailOffer | null;
  fetchingStatusOffer: RequestStatus;
}

export type ReviewsData = {
  reviews: Review[];
  fetchingStatusReviews: RequestStatus;
  sendingStatusReview: RequestStatus;
}

export type NearbyData = {
  nearby: Offer[];
  fetchingStatusNearby: RequestStatus;
}

export type FavoritesData = {
  favorites: Offer[];
  fetchingStatusFavorites: RequestStatus;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
