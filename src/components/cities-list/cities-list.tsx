import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {changeCity, getSortedOffers} from '../../store/action';
import classNames from 'classnames';

type CitiesListProps = {
  cities: string[];
  activeCity: string;
}

function CitiesList({cities, activeCity}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, i) => {
        const keyValue = `${city}-${i}`;
        return (
          <li className="locations__item" key={keyValue}>
            <Link
              className={classNames({
                'locations__item-link': true,
                'tabs__item': true,
                'tabs__item--active': activeCity === city
              })}
              to="#"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(changeCity(city));
                dispatch(getSortedOffers(city));
              }}
            >
              <span>{city}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CitiesList;
