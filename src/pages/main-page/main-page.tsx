import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {Cities} from '../../const';
import {City, Offer} from '../../types/offer-types';
import HeaderFull from '../../components/header/header-full';
import CitiesList from '../../components/cities-list/cities-list';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';

type MainProps = {
  city: City;
}

function MainPage({city}: MainProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const sortOffers = useAppSelector((state) => state.sortOffers);

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const handleOfferCardHover = (id: string | undefined) => {
    if (!id) {
      setSelectedPoint(undefined);
    }

    const currentPoint = sortOffers.find((offer) => offer.id === id);

    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <HeaderFull/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={Cities}
              activeCity={activeCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortOffers.length} places to stay in {activeCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList type='cities' offers={sortOffers} onOfferCardHover={handleOfferCardHover}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={city} points={sortOffers} selectedPoint={selectedPoint} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
