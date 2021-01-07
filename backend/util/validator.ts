import * as FS from 'fs';
import ListType from '../types/list-types';

const possibleLists: Array<ListType> = ['ANIME', 'MANGA'];

export function checkIsListTypeValid(type: ListType): boolean {
  return possibleLists.includes(type);
}

export function checkIfFileExists(path: string): boolean {
  const isPathToXMLFile = path.split('.').pop() === 'xml';
  const doesFileAlreadyExist = FS.existsSync(path);
  return isPathToXMLFile && doesFileAlreadyExist;
}

export function checkIsListIsValid<T>(list: Array<T>) {
  return list && Array.isArray(list) && list.length > 0;
}
