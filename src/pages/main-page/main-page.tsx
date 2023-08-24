import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus, RequestStatus} from '../../const';
import {fetchOffersAction, fetchFavoritesAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-data/user-data.selectors';
import {getOffers, getOffersFetchingStatus, getActiveCity} from '../../store/offers-data/offers-data.selectors';
import {CitiesListMemo as CitiesList} from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import MainEmpty from '../../components/main-empty/main-empty';
import Cities from '../../components/cities/cities';
import Loader from '../../components/loader/loader';
import classNames from 'classnames';

function MainPage(): JSX.Element {
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersFetchingStatus);
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);
  const isEmpty = offers.length === 0;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (isAuthorizationStatus === AuthorizationStatus.Unknown ||
    isOffersDataLoading === RequestStatus.Pending) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main
        className={classNames({
          'page__main page__main--index': true,
          'page__main--index-empty': isEmpty,
        })}
      >
        <CitiesList currentCity={activeCity.name}/>
        {isEmpty ? <MainEmpty/> : <Cities offers={offers} activeCity={activeCity}/>}
      </main>
    </div>
  );
}

export default MainPage;
