import moment, { duration } from 'moment';
import { CHANGE_MODAL, UPDATE_DAYS } from '../actions/app';
import { SIGNED_IN } from '../actions/auth';
import { seasonStart, weekSeasonStart, seasonEnd } from '../config';

const currentDate = moment(new Date()).utc().startOf('day');
const currentDays = currentDate.diff(seasonStart, 'days');
const currentDate2 = moment(new Date()).utc().startOf('day');
const currentDays2 = currentDate2.diff(seasonStart, 'days');
const getWeek = (date) => Math.ceil(duration(moment(date).add({ second: 1 }).diff(weekSeasonStart)).asWeeks());


export default function app(
  state = {
    date: currentDate,
    date2: currentDate2,
    daysSinceSeasonStart: currentDays,
    daysSinceSeasonStart2: currentDays2,
    week: getWeek(currentDate),
    week2: getWeek(currentDate2),
    currentModal: null,
  },
  { type, days, modalName },
) {
  if (type === UPDATE_DAYS) {
    const date = moment(seasonStart).add(days[0], 'days');
    const date2 = moment(seasonStart).add(days[1], 'days');
    return {
      ...state,
      date: date,
      date2: date2,
      daysSinceSeasonStart: days[0],
      daysSinceSeasonStart2: days[1],
      week: getWeek(date),
      week2: getWeek(date2),
    };
  }

  if (type === CHANGE_MODAL) {
    return {
      ...state,
      currentModal: modalName,
    };
  }

  if (type === SIGNED_IN) {
    return {
      ...state,
      currentModal: null,
    };
  }

  return state;
}
