import * as Path from 'path';
import * as FS from 'fs';
import * as Crypto from 'crypto';
import ListInterface from '../interfaces/list';
import ListType from '../types/list-types';
import CalcDate from './calculate-date';
import { checkIsListTypeValid, checkIfFileExists, checkIsListIsValid } from './validator';

import {
  calcListStats, calcUserInfoFormat, calcMangaFormat, calcAnimeFormat,
} from './data-transformer';

/**
 * Check if a file at a given path already exists.
 * If that is the case, then delete the file
 * @param path string
 */
function checkForFileAndDeleteFile(path: string) {
  if (checkIfFileExists(path)) {
    FS.unlinkSync(path);
  }
}

function openEnvelope(): string {
  return '<?xml version="1.0" encoding="UTF-8" ?>\n<myanimelist>\n';
}

function closeEnvelope(): string {
  return '\n</myanimelist>';
}

/**
 * Create a hashed fileName.
 * This filename will include the username, actual date, type and a generated random string
 * @param type ListType
 * @param username string
 */
function createFileHashedName(type: ListType, username: string): string {
  const randomString = Crypto.randomBytes(126).toString('hex');
  const fileName = `${CalcDate()}_${type.toLocaleLowerCase()}_${username}_${randomString}`;
  const hashedFileName = Crypto.createHash('sha256').update(fileName).digest('hex');
  return hashedFileName;
}

export default function writeListToXML(arrayOfItemLists: Array<ListInterface> = [], type: ListType = 'ANIME', username: string = ''): string {
  let fileName = '';

  const isListOfItemsValid = checkIsListIsValid(arrayOfItemLists);
  const isTypeValid = checkIsListTypeValid(type);
  const areParamsValid = isListOfItemsValid && isTypeValid && username;

  if (areParamsValid) {
    fileName = createFileHashedName(type, username);

    const filePath = Path.join(
      __dirname,
      `../temp-output-files/${type.toLowerCase()}/`,
      `${fileName}.xml`,
    );

    checkForFileAndDeleteFile(filePath);

    const writeStream = FS.createWriteStream(filePath);
    writeStream.write(openEnvelope());

    const calculatedUserData = { username, ...calcListStats(arrayOfItemLists) };
    writeStream.write(calcUserInfoFormat({ ...calculatedUserData, type }));

    const selectedTransformation = type === 'MANGA' ? calcMangaFormat : calcAnimeFormat;

    for (let i = 0; i < arrayOfItemLists.length; i += 1) {
      const { entries: selectedListEntries } = arrayOfItemLists[i];
      for (let k = 0; k < selectedListEntries.length; k += 1) {
        const entry = selectedListEntries[k];
        const serializedEntry = selectedTransformation(entry);
        writeStream.write(serializedEntry);
      }
    }

    writeStream.write(closeEnvelope());
    writeStream.close();
  }
  return fileName;
}
