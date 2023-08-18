import {createSelector} from '@reduxjs/toolkit';
import {ReviewsData, State} from '../../types/state-types';
import {NameSpace} from '../../const';

export const getReviews = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.reviews,
);

export const getReviewsFetchingStatus = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.fetchingStatusReviews,
);

export const getReviewSendingStatus = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.sendingStatusReview,
);
