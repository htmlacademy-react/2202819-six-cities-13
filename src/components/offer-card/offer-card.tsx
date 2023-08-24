import {memo, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Offer} from '../../types/offer-types';
import BookmarkButton from '../bookmark-button/bookmark-button';
import classNames from 'classnames';

type OfferCardProps = Offer & {
  favorite?: boolean;
  onOfferCardHover?: (id: string | undefined) => void;
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const {id, title, type, price, isFavorite, isPremium, rating, previewImage, favorite = false, onOfferCardHover} = props;

  const [activeFavorite, setActiveFavorite] = useState(isFavorite);

  const handleOfferCardHover = useCallback(() => {
    onOfferCardHover?.(id);
  }, [id , onOfferCardHover]);

  const handleOfferCardLeave = useCallback(() => {
    onOfferCardHover?.(undefined);
  }, [onOfferCardHover]);

  return (
    <article className={classNames({
      'place-card': true,
      'cities__card': !favorite,
      'favorites__card': favorite,
    })}
    onMouseEnter={() => handleOfferCardHover()}
    onMouseLeave={() => handleOfferCardLeave()}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={classNames({
        'place-card': true,
        'cities__card': !favorite,
        'favorites__card': favorite,
      })}
      >
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width={favorite ? 150 : 260} height={favorite ? 110 : 200} alt="Place image"/>
        </Link>
      </div>
      <div className={classNames(
        {'favorites__card-info': favorite},
        'place-card__info')}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton type='place-card' id={id} isDetailed={false} isFavorite={activeFavorite} onClick={() => setActiveFavorite((prev) => !prev)}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}

export const OfferCardMemo = memo(OfferCard);
