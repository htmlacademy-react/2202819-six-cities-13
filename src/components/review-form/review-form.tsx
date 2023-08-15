import {useState, useEffect, FormEvent, ChangeEvent, Fragment} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {dropSendingStatus} from '../../store/action';
import {postReview} from '../../store/api-actions';
import {RequestStatus} from '../../const';

const CommentLength = {MIN: 50, MAX: 300};

const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

type ReviewSendFormProps = {
  id: string;
}

function ReviewSendForm({id}: ReviewSendFormProps) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector((state) => state.sendingReviewStatus);

  const isValid =
    comment.length >= CommentLength.MIN &&
    comment.length <= CommentLength.MAX &&
    rating !== '';

  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }

  function handleCommentChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReview({reviewData: {comment, rating: +rating}, id}));
  };

  useEffect(() => {
    switch (sendingStatus) {
      case RequestStatus.Success:
        setComment('');
        setRating('');
        dispatch(dropSendingStatus());
        break;
      case RequestStatus.Pending:
        setIsSubmitting(true);
        break;
      default:
        setIsSubmitting(false);
    }
  }, [sendingStatus, dispatch]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      {sendingStatus === RequestStatus.Error &&
        <p>Не удалось отправить комментарий, попробуйте еще раз!</p>}

      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input className="form__rating-input visually-hidden" name="rating" value={score} id={`${score}-stars`} type="radio" checked={rating === score} onChange={handleRatingChange}/>
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

export default ReviewSendForm;
