import {Offer} from '../../types/offer-types';
import HeaderFull from '../../components/header/header-full';
import OffersList from '../../components/offers-list/offers-list';

type FavoritesProps = {
  offers: Offer[];
}

function FavoritesPage({offers}: FavoritesProps): JSX.Element {
  return (
    <div className="page">
      <HeaderFull/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <OffersList offers={offers} onListItemHover={() => ''}/>
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
