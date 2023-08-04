enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer',
  Favorites = '/favorites',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

const URL_MARKER_DEFAULT = '../img/pin.svg';

const URL_MARKER_CURRENT = '../img/pin-active.svg';

export {AppRoute, AuthorizationStatus, CITIES, URL_MARKER_DEFAULT, URL_MARKER_CURRENT};
