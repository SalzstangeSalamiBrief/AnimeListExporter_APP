"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
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
function getList(username = '', type = 'ANIME') {
    return __awaiter(this, void 0, void 0, function* () {
        let result = null;
        const areParamsValid = username && type;
        if (areParamsValid) {
            const variables = { username, type };
            options.body = JSON.stringify({ query, variables });
            try {
                const response = yield node_fetch_1.default(APIUrl, options);
                const { data, errors } = yield response.json();
                const hasRequestErrors = errors && errors.length > 0;
                if (hasRequestErrors) {
                    const errorString = errors.map((err) => `${err.message} \\n`);
                    throw errorString;
                }
                const { MediaListCollection: { lists } } = data;
                result = lists;
            }
            catch (error) {
                console.error(error);
            }
        }
        return result;
    });
}
exports.default = getList;
//# sourceMappingURL=api-requests.js.map