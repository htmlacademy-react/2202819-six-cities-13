import {City} from './types/offer-types';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer',
  Favorites = '/favorites',
}

export enum APIRoute{
  Login = '/login',
  Logout = '/logout',
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf ='Dusseldorf',
}

export const CityMap: Record<CityName, City> = {
  [CityName.Paris]: {
    name: CityName.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  [CityName.Cologne]: {
    name: CityName.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  [CityName.Brussels]: {
    name: CityName.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  [CityName.Amsterdam]: {
    name: CityName.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  [CityName.Hamburg]: {
    name: CityName.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  [CityName.Dusseldorf]: {
    name: CityName.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
} as const;

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
