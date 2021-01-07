import ListTypes from '../types/list-types';

interface UserDataInterface {
  username: string;
  type: ListTypes;
  completed?: number;
  paused?: number;
  dropped?: number;
  planning?: number;
  total?: number;
  active?: number;
}

export default UserDataInterface;
