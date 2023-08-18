import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {sorting} from '../../utils';
import {Offer} from '../../types/offer-types';
import {getOffers, getActiveCity} from '../../store/offers-data/offers-data.selectors';
import MainEmptyPage from './main-empty-page';
import Map from '../../components/map/map';
import HeaderFull from '../../components/header/header-full';
import CitiesList from '../../components/cities-list/cities-list';
import OffersList from '../../components/offers-list/offers-list';
import PlaceSort from '../../components/sort-options/sort-options';

function MainPage(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);

  const sortOffers = offers
    .slice()
    .filter((item) => item.city.name === activeCity.name);

  const [currentSort, setCurrentSort] = useState('popular');

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const handleOfferCardHover = (id: string | undefined) => {
    if (!id) {
      setSelectedPoint(undefined);
    }

    const currentPoint = sortOffers.find((sortOffer) => sortOffer.id === id);

    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <HeaderFull/>
      {sortOffers.length ?
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList
                activeCity={activeCity.name}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortOffers.length} places to stay in {activeCity.name}</b>
                <PlaceSort onChange={(newSort) => setCurrentSort(newSort)}/>
                <OffersList type='cities' offers={sorting[currentSort](sortOffers)} onOfferCardHover={handleOfferCardHover}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={activeCity} points={sortOffers} selectedPoint={selectedPoint} />
                </section>
              </div>
            </div>
          </div>
        </main>
        : <MainEmptyPage />}
    </div>
  );
}

export default MainPage;
