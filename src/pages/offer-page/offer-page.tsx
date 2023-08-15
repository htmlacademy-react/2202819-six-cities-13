import {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams, Navigate} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchOfferAction} from '../../store/api-actions';
import {AuthorizationStatus} from '../../const';
import {Offer} from '../../types/offer-types';
import LoadingPage from '../loading-page/loading-page';
import Map from '../../components/map/map';
import HeaderFull from '../../components/header/header-full';
import OffersList from '../../components/offers-list/offers-list';
import ReviewList from '../../components/review-list/review-list';
import ReviewSendForm from '../../components/review-form/review-form';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import DetailOffer from '../../components/detailed-offer/detailed-offer';

function OfferPage(): JSX.Element {
  const params = useParams();
  const reviews = useAppSelector((state) => state.reviews);
  const offer = useAppSelector((state) => state.currentOffer);
  const offersNearby = useAppSelector((state) => state.offersNearby);
  const isAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isDetailedOfferDataLoading = useAppSelector((state) => state.isDetailedOfferDataLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOfferAction(params.id));
    }
  }, [dispatch, params.id]);

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

  if (isDetailedOfferDataLoading){
    return (
      <LoadingPage />
    );
  }

  if (!offer){
    return <Navigate to='/Page404'></Navigate>;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Offer</title>
      </Helmet>
      <HeaderFull/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery offer={offer} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              <DetailOffer offer={offer} />
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews}/>
                {isAuthorizationStatus === AuthorizationStatus.Auth &&
                <ReviewSendForm id={params.id as string} />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={offer.city} points={offersNearby} selectedPoint={selectedPoint}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList type='near-places' offers={offersNearby} onOfferCardHover={handleOfferCardHover}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
