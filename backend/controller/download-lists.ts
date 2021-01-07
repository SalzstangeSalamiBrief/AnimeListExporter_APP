import { Request, Response } from 'express';
import * as Path from 'path';
// import * as FS from 'fs';
import ListType from '../types/list-types';

import { checkIsListTypeValid, checkIfFileExists } from '../util/validator';

const basePath = Path.resolve('./dist/temp-output-files/');

export default function downloadList(req: Request, res: Response) {
  const { fileName, list: type } = req.params;
  const isListTypeValid = checkIsListTypeValid(<ListType>type.toUpperCase());
  const areParamsValid = isListTypeValid && fileName;
  if (areParamsValid) {
    const pathToFile = Path.resolve(basePath, `./${type.toLowerCase()}`, `./${fileName}.xml`);
    const doesFileExist = checkIfFileExists(pathToFile);
    if (doesFileExist) {
      return res.status(200).download(pathToFile);
      // todo: delete list after download,
    }
  }
  return res.status(404).end();
}
