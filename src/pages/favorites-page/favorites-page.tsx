import {Helmet} from 'react-helmet-async';
import {Offer} from '../../types/offer-types';
import HeaderFull from '../../components/header/header-full';
import OffersList from '../../components/offers-list/offers-list';

type FavoritesProps = {
  offers: Offer[];
}

function FavoritesPage({offers}: FavoritesProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Favorites</title>
      </Helmet>
      <HeaderFull/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <OffersList offers={favoriteOffers} onOfferCardHover={() => ''} type='favorites'/>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
