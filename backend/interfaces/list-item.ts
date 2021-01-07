import ItemStatus from '../types/status';

interface MediaInterface {
  idMal: number;
  title: { romaji: string};
}

interface ListItemInterface {
  status: ItemStatus;
  media: MediaInterface;
  progress: number,
  score: number;
  notes?: string,
  repeat: number;
}

export default ListItemInterface;
