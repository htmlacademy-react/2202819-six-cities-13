import {createReducer} from '@reduxjs/toolkit';
import {postReview} from './api-actions';
import {AuthorizationStatus, RequestStatus, CityMap} from '../const';
import {City, Offer, DetailOffer} from '../types/offer-types';
import {Review} from '../types/review-types';
import {changeCity, loadOffers, loadDetailedOffer, loadReviews, loadOffersNearby, addReview, requireAuthorization, setOffersDataLoadingStatus, setDetailedOfferDataLoadingStatus, dropSendingStatus} from '../store/action';

type InitialState = {
  city: City;
  offers: Offer[];
  reviews: Review[];
  sortOffers: Offer[];
  filterOffers: Offer[];
  offersNearby: Offer[];
  currentOffer: DetailOffer | null;
  isOffersDataLoading: boolean;
  isDetailedOfferDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  sendingReviewStatus: string;
}

const initialState: InitialState = {
  city: CityMap.Paris,
  offers: [],
  reviews: [],
  sortOffers: [],
  filterOffers: [],
  offersNearby: [],
  currentOffer: null,
  isOffersDataLoading: false,
  isDetailedOfferDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  sendingReviewStatus: RequestStatus.Unsent,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadDetailedOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(postReview.pending, (state) => {
      state.sendingReviewStatus = RequestStatus.Pending;
    })
    .addCase(postReview.fulfilled, (state) => {
      state.sendingReviewStatus = RequestStatus.Success;
    })
    .addCase(postReview.rejected, (state) => {
      state.sendingReviewStatus = RequestStatus.Error;
    })
    .addCase(dropSendingStatus, (state) => {
      state.sendingReviewStatus = RequestStatus.Unsent;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setDetailedOfferDataLoadingStatus, (state, action) => {
      state.isDetailedOfferDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
