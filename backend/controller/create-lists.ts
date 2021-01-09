import { Request, Response } from 'express';
import GetList from '../util/api-requests';
import FileWriter from '../util/file-handler';
import { checkIsListTypeValid } from '../util/validator';
import ListType from '../types/list-types';

export default async function createList(req: Request, res: Response) {
  const { username, list } = req.params;
  const listInUpperCase = <ListType>list.toUpperCase();
  const isListTypeValid = checkIsListTypeValid(listInUpperCase);
  const areParamsValid = username && isListTypeValid;
  let status = 400;
  // todo errorhandling
  const responsePayload = { err: [], downloadPath: '' };
  if (areParamsValid) {
    try {
      const data = await GetList(username, listInUpperCase);
      if (data) {
        const fileName = FileWriter(data, listInUpperCase, username);
        responsePayload.downloadPath = `/download-list/list/${list.toLowerCase()}/file/${fileName}`;
        status = 200;
      }
    } catch (error) {
      console.log(error);
    }
  }
  res.status(status).send(responsePayload);
}
