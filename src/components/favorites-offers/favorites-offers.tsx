import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer-types';
import {OfferCardMemo as OfferCard} from '../offer-card/offer-card';

type FavoritesOffersProps = {
  favorites: Offer[];
}

function FavoritesOffers({favorites}: FavoritesOffersProps): JSX.Element {
  const citiesSet = new Set<string>();
  const uniqueCities = Array.from(citiesSet);

  favorites.forEach((favorite) => {
    citiesSet.add(favorite.city.name);
  });

  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {uniqueCities.map((city, i) => {
            const keyValue = `${city}-${i}`;
            return (
              <li className="favorites__locations-items" key={keyValue}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="#">
                      <span>{city}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {favorites
                    .filter((offer) => offer.city.name === city)
                    .map((offer) => (
                      <OfferCard type='favorites' key={offer.id} offer={offer} onOfferCardHover={() => undefined}/>
                    ))}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default FavoritesOffers;
