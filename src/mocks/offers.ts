import {Offer} from '../types/offer-types';
import {DetailedOffer} from '../types/offer-types';

export const offers: Offer[] = [
  {
    id: '2f0f1823-f620-43f5-91f9-530386ab335b',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'house',
    price: 716,
    previewImage: 'https://13.design.pages.academy/static/hotel/4.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 1.2,
  },
  {
    id: '39a1d17c-aafe-4d86-9a8b-d4353094b227',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 177,
    previewImage: 'https://13.design.pages.academy/static/hotel/15.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 2,
  },
  {
    id: 'fb3c6a5c-399f-41cb-8c01-93e32e9368b2',
    title: 'Tile House',
    type: 'house',
    price: 107,
    previewImage: 'https://13.design.pages.academy/static/hotel/12.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
  },
  {
    id: 'c1a075e5-6704-4bef-bc4d-7a85c1037ae9',
    title: 'House in countryside',
    type: 'hotel',
    price: 327,
    previewImage: 'https://13.design.pages.academy/static/hotel/3.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
  },
];

const additionalInfo = [
  {
    description:
      'This is a place for dreamers to reset, reflect, and create. Designed with a "slow" pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    bedrooms: 1,
    goods: [
      'Washer',
      'Cable TV',
      'Laptop friendly workspace',
      'Coffee machine',
      'Dishwasher',
      'Baby seat',
      'Heating',
      'Air conditioning',
      'Kitchen',
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl:
        'https://13.design.pages.academy/static/host/avatar-angelina.jpg',
    },
    images: [
      'https://13.design.pages.academy/static/hotel/8.jpg',
      'https://13.design.pages.academy/static/hotel/19.jpg',
      'https://13.design.pages.academy/static/hotel/15.jpg',
      'https://13.design.pages.academy/static/hotel/13.jpg',
      'https://13.design.pages.academy/static/hotel/16.jpg',
      'https://13.design.pages.academy/static/hotel/2.jpg',
    ],
    maxAdults: 8,
  },
  {
    description:
      'This is a place for dreamers to reset, reflect, and create. Designed with a "slow" pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    bedrooms: 3,
    goods: [
      'Cable TV',
      'Washing machine',
      'Kitchen',
      'Dishwasher',
      'Baby seat',
      'Air conditioning',
      'Heating',
      'Coffee machine',
      'Towels',
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl:
        'https://13.design.pages.academy/static/host/avatar-angelina.jpg',
    },
    images: [
      'https://13.design.pages.academy/static/hotel/2.jpg',
      'https://13.design.pages.academy/static/hotel/10.jpg',
      'https://13.design.pages.academy/static/hotel/13.jpg',
      'https://13.design.pages.academy/static/hotel/8.jpg',
      'https://13.design.pages.academy/static/hotel/15.jpg',
      'https://13.design.pages.academy/static/hotel/5.jpg',
    ],
    maxAdults: 7,
  },
  {
    description:
      'This is a place for dreamers to reset, reflect, and create. Designed with a "slow" pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    bedrooms: 3,
    goods: ['Kitchen', 'Fridge', 'Cable TV'],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl:
        'https://13.design.pages.academy/static/host/avatar-angelina.jpg',
    },
    images: [
      'https://13.design.pages.academy/static/hotel/19.jpg',
      'https://13.design.pages.academy/static/hotel/2.jpg',
      'https://13.design.pages.academy/static/hotel/20.jpg',
      'https://13.design.pages.academy/static/hotel/12.jpg',
      'https://13.design.pages.academy/static/hotel/4.jpg',
      'https://13.design.pages.academy/static/hotel/6.jpg',
    ],
    maxAdults: 1,
  },
  {
    description:
      'I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!',
    bedrooms: 2,
    goods: [
      'Air conditioning',
      'Cable TV',
      'Washing machine',
      'Baby seat',
      'Kitchen',
      'Wi-Fi',
      'Fridge',
      'Coffee machine',
      'Heating',
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl:
        'https://13.design.pages.academy/static/host/avatar-angelina.jpg',
    },
    images: [
      'https://13.design.pages.academy/static/hotel/5.jpg',
      'https://13.design.pages.academy/static/hotel/4.jpg',
      'https://13.design.pages.academy/static/hotel/10.jpg',
      'https://13.design.pages.academy/static/hotel/14.jpg',
      'https://13.design.pages.academy/static/hotel/16.jpg',
      'https://13.design.pages.academy/static/hotel/18.jpg',
    ],
    maxAdults: 8,
  },
];

export const detailedOffers: DetailedOffer[] = offers.map((offer, index) => ({
  ...offer,
  ...additionalInfo[index],
}));
