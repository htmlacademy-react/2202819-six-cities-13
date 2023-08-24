import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {RequestStatus} from '../../const';
import {Offer} from '../../types/offer-types';
import {fetchFavoritesAction} from '../../store/api-actions';
import {getFavorites, getFavoritesFetchingStatus} from '../../store/favorites-data/favorites-data.selectors';
import Loader from '../../components/loader/loader';
import Header from '../../components/header/header';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesOffers from '../../components/favorites-offers/favorites-offers';
import Footer from '../../components/footer/footer';
import classNames from 'classnames';

const getFavoritesByCity = (favorites: Offer[]) => favorites.reduce<{[key: string]: Offer[]}>((acc, current) => {
  const city = current.city.name;
  if (!(city in acc)) {
    acc[city] = [];
  }
  acc[city].push(current);
  return acc;
}, {});

function FavoritesPage(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const fetchingStatus = useAppSelector(getFavoritesFetchingStatus);
  const isEmpty = favorites.length === 0;

  const dispatch = useAppDispatch();

  const favoriteByCity = getFavoritesByCity(favorites);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (fetchingStatus === RequestStatus.Pending) {
    return (
      <Loader/>
    );
  }

  return (
    <div className={classNames({
      'page': true,
      'page--favorites-empty': isEmpty,
    })}
    >
      <Helmet>
        <title>6 cities: Favorites</title>
      </Helmet>
      <Header/>
      <main className={classNames({
        'page__main': true,
        'page__main--favorites': true,
        'page__main--favorites-empty': isEmpty
      })}
      >
        {isEmpty ? <FavoritesEmpty/> : <FavoritesOffers offers={Object.entries(favoriteByCity)}/>}
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesPage;
