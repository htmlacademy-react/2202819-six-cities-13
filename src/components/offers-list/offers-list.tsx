import {Offer} from '../../types/offer-types';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  onListItemHover: (id: string) => void;
}

function OffersList({offers, onListItemHover}: OffersListProps): JSX.Element {
  const handleOfferCardHover = (id: string) => {
    onListItemHover(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (<OfferCard key={offer.id} offer={offer} handleOfferCardHover={() => handleOfferCardHover(offer.id)}/>)
      )}
    </div>
  );
}

export default OffersList;
