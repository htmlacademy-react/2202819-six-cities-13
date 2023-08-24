import {memo} from 'react';
import {Offer} from '../../types/offer-types';
import {OfferCardMemo as OfferCard} from '../offer-card/offer-card';
import classNames from 'classnames';

type OffersListProps = {
  offers: Offer[];
  type: 'cities' | 'near-places';
  onOfferCardHover: (id: string | undefined) => void;
}

function OffersList({offers, type, onOfferCardHover}: OffersListProps): JSX.Element {
  const offersListClass = classNames({
    'places__list': true,
    'cities__places-list tabs__content': type === 'cities',
    'near-places__list': type === 'near-places',
  });

  return (
    <div className={offersListClass}>
      {offers.map((offer) => (<OfferCard key={offer.id} {...offer} onOfferCardHover={onOfferCardHover}/>))}
    </div>
  );
}

export const OffersListMemo = memo(OffersList);
