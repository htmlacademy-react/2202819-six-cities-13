import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {CITIES} from '../../const';
import {City, Offer} from '../../types/offer-types';
import HeaderFull from '../../components/header/header-full';
import CitiesList from '../../components/cities-list/cities-list';
import OffersList from '../../components/offers-list/offers-list';
import PlaceSort from '../../components/sort-options/sort-options';
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
              cities={CITIES}
              activeCity={activeCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortOffers.length} places to stay in {activeCity}</b>
              <PlaceSort />
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
