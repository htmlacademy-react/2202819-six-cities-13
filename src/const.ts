const enum Settings {
  OFFERS = 312,
}

enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer/:id',
  Favorites = '/favorites',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export{Settings, AppRoute, AuthorizationStatus};
