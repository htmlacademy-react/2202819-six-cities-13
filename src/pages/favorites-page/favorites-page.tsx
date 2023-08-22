import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {RequestStatus} from '../../const';
import {fetchFavoritesAction} from '../../store/api-actions';
import {getFavorites, getFavoritesFetchingStatus} from '../../store/favorites-data/favorites-data.selectors';
import Loader from '../../components/loader/loader';
import HeaderFull from '../../components/header/header-full';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesOffers from '../../components/favorites-offers/favorites-offers';
import Footer from '../../components/footer/footer';
import classNames from 'classnames';

function FavoritesPage(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const fetchingStatus = useAppSelector(getFavoritesFetchingStatus);
  const isEmpty = favorites.length === 0;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (fetchingStatus === RequestStatus.Pending) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Favorites</title>
      </Helmet>
      <HeaderFull/>
      <main
        className={classNames({
          'page__main page__main--favorites': true,
          'page__main--favorites-empty': isEmpty
        })}
      >
        {isEmpty ? <FavoritesEmpty/> : <FavoritesOffers favorites={favorites}/>}
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesPage;
