import {useState, useEffect, FormEvent, ChangeEvent, Fragment} from 'react';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {RequestStatus} from '../../const';
import {Offer} from '../../types/offer-types';
import {postReview} from '../../store/api-actions';
import {dropReviewSendingStatus} from '../../store/reviews-data/reviews-data.slice';
import {getReviewSendingStatus} from '../../store/reviews-data/reviews-data.selectors';

const CommentLength = {MIN: 50, MAX: 300};

const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

type ReviewFormProps = {
  id: Offer['id'];
}

function ReviewForm({id}: ReviewFormProps): JSX.Element {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector(getReviewSendingStatus);

  const isValid =
    comment.length >= CommentLength.MIN &&
    comment.length <= CommentLength.MAX &&
    rating !== '';

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReview({reviewData: {comment, rating: Number(rating)}, id}));
  };

  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }

  function handleCommentChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      switch (sendingStatus) {
        case RequestStatus.Success:
          setRating('');
          setComment('');
          dispatch(dropReviewSendingStatus());
          break;
        case RequestStatus.Pending:
          setIsSubmitting(true);
          break;
        case RequestStatus.Error:
          toast.warn('Комментарий не отправлен');
          setIsSubmitting(false);
          break;
        default:
          setIsSubmitting(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [sendingStatus, dispatch]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input className="form__rating-input visually-hidden" name="rating" value={score} id={`${score}-stars`} type="radio" checked={rating === score} disabled={isSubmitting} onChange={handleRatingChange}/>
              <label htmlFor={`${score}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
      </div>

      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} disabled={isSubmitting} onChange={handleCommentChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{CommentLength.MIN}</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isSubmitting}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
