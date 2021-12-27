import moment from 'moment';

export const enumerateDaysBetweenDates = function(startDate, endDate) {
  let daysList = [];
  let SDate = moment(startDate);
  let EDate = moment(endDate);
  let xt;
  daysList.push(SDate.format('YYYY-MM-DD'));
  while (SDate.add(1, 'days').isBefore(EDate)) {
    daysList.push(SDate.format('YYYY-MM-DD'));
  }
  daysList.push(EDate.format('YYYY-MM-DD'));
  return daysList;
};

export const getSubTractDate = function(n = -2) {
  return moment()
    .subtract(n, 'months')
    .format('YYYY-MM-DD');
};
