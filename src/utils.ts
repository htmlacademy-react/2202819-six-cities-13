import {Offer} from './types/offer-types';

export const sorting: Record<string, (offers: Offer[]) => Offer[]> = {
  popular: (offers: Offer[]) => offers.slice(),
  high: (offers: Offer[]) => offers.slice().sort((a: Offer, b: Offer) => a.price - b.price),
  low: (offers: Offer[]) => offers.slice().sort((a: Offer, b: Offer) => b.price - a.price),
  top: (offers: Offer[]) => offers.slice().sort((a: Offer, b: Offer) => b.rating - a.rating),
};

export const getFormatDate = (date: string): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date(date);
  const currentDay = currentDate.getDate();
  const currentMonth = months[currentDate.getMonth()];

  return `${currentDay < 10 ? '0' : ''}${currentDay} ${currentMonth}`;
};

export const getDateTime = (date: string): string => date.split('T')[0];
