import ListItemInterface from './list-item';
import StatusType from '../types/status';

interface ListInterface {
  status: StatusType;
  entries: Array<ListItemInterface>;
  isCustomList: boolean;
  isSplitCompletedList: boolean;
  name: 'Paused' | 'Watching' | 'Reading' | 'Rewatching' | 'Rereading' | 'Dropped' | 'Planning' | 'Completed'

}

export default ListInterface;
