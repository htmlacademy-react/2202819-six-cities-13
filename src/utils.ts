const getFormatDate = (date: string): string => {
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

const getDateTime = (date: string): string => date.split('T')[0];

export { getFormatDate, getDateTime };
