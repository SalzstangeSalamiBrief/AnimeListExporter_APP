import Fetch from 'node-fetch';

import ListTypes from '../types/list-types';

import RequestErrorInterface from '../interfaces/request-error';
import ListInterface from '../interfaces/list';

const APIUrl = 'https://graphql.anilist.co';
const query = `
query ($username: String, $type: MediaType) {
  MediaListCollection(userName: $username, type: $type){
    lists {
      entries {
        id
        status
        score(format: POINT_10)
        progress
        notes
        repeat
        media {
          chapters
          volumes
          idMal
          episodes
          title { romaji }
        }
      }
      name
      isCustomList
      isSplitCompletedList
      status
    }
  }
}
`;

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: '',
};

/**
 * Create a POST-Request to the anilist api.
 * returns null if the params are invalid or the response got errors.
 * else return a list of Items
 * @param username string
 * @param type ListTypes
 */
export default async function getList(username: string = '', type: ListTypes = 'ANIME'): Promise<Array<ListInterface> | null> {
  let result = null;
  const areParamsValid = username && type;
  if (areParamsValid) {
    const variables = { username, type };
    options.body = JSON.stringify({ query, variables });

    try {
      const response = await Fetch(APIUrl, options);
      const { data, errors } = await response.json();

      const hasRequestErrors = errors && errors.length > 0;
      if (hasRequestErrors) {
        const errorString = errors.map((err: RequestErrorInterface) => `${err.message} \\n`);
        throw errorString;
      }
      const { MediaListCollection: { lists } } = data;
      result = lists;
    } catch (error) {
      console.error(error);
    }
  }

  return result;
}
