import ListTypes from '../types/list-types';
import ItemStatus from '../types/status';

export default function calcNewStatus(status: ItemStatus = 'PLANNING', listType: ListTypes = 'ANIME'): string {
  let calculatedStatus = '';

  const currentStatus = status.toUpperCase();
  switch (currentStatus) {
    case 'PAUSED':
      calculatedStatus = 'On-Hold';
      break;
    case 'PLANNING':
      calculatedStatus = listType === 'ANIME' ? 'Plan to Watch' : 'Plan to Read';
      break;
    case 'CURRENT':
      calculatedStatus = listType === 'ANIME' ? 'Watching' : 'Reading';
      break;
    case 'DROPPED':
      calculatedStatus = 'Dropped';
      break;
    default:
      calculatedStatus = 'Completed';
      break;
  }
  return calculatedStatus;
}
