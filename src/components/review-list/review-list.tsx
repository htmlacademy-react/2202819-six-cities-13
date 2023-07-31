import {Review} from '../../types/review-types';
import ReviewCard from '../review-card/review-card';

type ReviewListProps ={
  reviews: Review[];
}

function ReviewList({reviews}: ReviewListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />)
        )}
      </ul>
    </>
  );
}

export default ReviewList;
