import {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus, RequestStatus} from '../../const';
import {Offer} from '../../types/offer-types';
import {fetchOfferAction, fetchReviewsAction, fetchOffersNearbyAction, fetchFavoritesAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-data/user-data.selectors';
import {getOffer, getOfferFetchingStatus} from '../../store/offer-data/offer-data.selectors';
import {getReviews} from '../../store/reviews-data/reviews-data.selectors';
import {getOffersNearby} from '../../store/nearby-data/nearby-data.selectors';
import {OffersListMemo as OffersList} from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import Loader from '../../components/loader/loader';
import HeaderFull from '../../components/header/header-full';
import ReviewList from '../../components/review-list/review-list';
import ReviewSendForm from '../../components/review-form/review-form';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import DetailOffer from '../../components/detailed-offer/detailed-offer';

const NEARBY_OFFERS_COUNT = 3;

function OfferPage(): JSX.Element {
  const params = useParams();
  const offer = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const offersNearby = useAppSelector(getOffersNearby);
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDetailedOfferDataLoading = useAppSelector(getOfferFetchingStatus);

  const dispatch = useAppDispatch();

  const offersNearbyOnTheMap = offersNearby.slice(0, NEARBY_OFFERS_COUNT);
  const threeOffersNearby = offersNearbyOnTheMap.slice(0, NEARBY_OFFERS_COUNT);

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const handleOfferCardHover = (id: string | undefined) => {
    if (!id) {
      setSelectedPoint(undefined);
    }

    const currentPoint = offersNearby.find((offerNearby) => offerNearby.id === id);

    setSelectedPoint(currentPoint);
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOfferAction(params.id));
      dispatch(fetchReviewsAction(params.id));
      dispatch(fetchOffersNearbyAction(params.id));
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, params.id]);

  if (offer) {
    offersNearbyOnTheMap.push(offer);
  }

  if (isDetailedOfferDataLoading === RequestStatus.Pending){
    return (
      <Loader />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Offer</title>
      </Helmet>
      <HeaderFull/>
      {isDetailedOfferDataLoading === RequestStatus.Success && offer &&
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery offer={offer}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <DetailOffer offer={offer}/>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews}/>
                {isAuthorizationStatus === AuthorizationStatus.Auth &&
                <ReviewSendForm id={params.id as string}/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={offer.city} points={offersNearbyOnTheMap} detailedOffer={offer} selectedPoint={selectedPoint}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList type='near-places' offers={threeOffersNearby} onOfferCardHover={handleOfferCardHover}/>
          </section>
        </div>
      </main>}
    </div>
  );
}

export default OfferPage;
