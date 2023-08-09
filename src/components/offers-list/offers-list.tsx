import {Offer} from '../../types/offer-types';
import OfferCard from '../offer-card/offer-card';
import classNames from 'classnames';

type OffersListProps = {
  offers: Offer[];
  onOfferCardHover: (id: string | undefined) => void;
  type: 'cities' | 'near-places' | 'favorites';
}

function OffersList({offers, onOfferCardHover, type}: OffersListProps): JSX.Element {
  const handleOfferCardHover = (id: string) => {
    onOfferCardHover(id);
  };

  const handleOfferCardLeave = () => {
    onOfferCardHover(undefined);
  };

  return (
    <div className={classNames(
      {'cities__places-list places__list tabs__content': type === 'cities'},
      {'near-places__list places__list': type === 'near-places'},
      {'favorites__places': type === 'favorites'})}
    >
      {offers.map((offer) => (<OfferCard key={offer.id} offer={offer} handleOfferCardHover={() => handleOfferCardHover(offer.id)} handleOfferCardLeave={() => handleOfferCardLeave()} type={type}/>)
      )}
    </div>
  );
}

export default OffersList;
