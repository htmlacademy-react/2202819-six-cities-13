import {useState} from 'react';
import {useParams, Navigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useAppSelector} from '../../hooks';
import {Review} from '../../types/review-types';
import {Offer, DetailedOffer} from '../../types/offer-types';
import Map from '../../components/map/map';
import HeaderFull from '../../components/header/header-full';
import ReviewList from '../../components/review-list/review-list';
import ReviewSendForm from '../../components/review-form/review-form';
import OffersList from '../../components/offers-list/offers-list';

const NEARBY_OFFERS_COUNT = 3;

type OfferProps = {
  offers: Offer[];
  detailedOffers: DetailedOffer[];
  reviews: Review[];
}

function OfferPage({offers, detailedOffers, reviews}: OfferProps): JSX.Element | null {
  const params = useParams();
  const detailedOffer = detailedOffers.find((elem) => elem.id === params.id);
  const activeCity = useAppSelector((state) => state.city);

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const handleOfferCardHover = (id: string | undefined) => {
    if (!id) {
      setSelectedPoint(undefined);
    }

    const currentPoint = offers.find((offer) => offer.id === id);

    setSelectedPoint(currentPoint);
  };

  if (!detailedOffer){
    return (
      <Navigate to='/Page404'></Navigate>
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Offer</title>
      </Helmet>
      <HeaderFull/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {detailedOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {detailedOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {detailedOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${Math.round(detailedOffer.rating) * 100 / 5}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{detailedOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {detailedOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {detailedOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {detailedOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{detailedOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {detailedOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>{good}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper offer__avatar-wrapper${detailedOffer.host.isPro ? '--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={detailedOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {detailedOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {detailedOffer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {detailedOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews}/>
                <ReviewSendForm/>
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={activeCity} points={offers.slice(0, NEARBY_OFFERS_COUNT)} selectedPoint={selectedPoint}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList type='near-places' offers={offers.slice(0, NEARBY_OFFERS_COUNT)} onOfferCardHover={handleOfferCardHover}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
