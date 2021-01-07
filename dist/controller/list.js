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
exports.getMangaList = exports.getAnimeList = void 0;
const api_requests_1 = __importDefault(require("../util/api-requests"));
const file_writer_1 = __importDefault(require("../util/file-writer"));
function getAnimeList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = req.params;
        console.log(username);
        let status = 400;
        if (username) {
            const data = yield api_requests_1.default(username, 'ANIME');
            if (data) {
                file_writer_1.default(data, 'ANIME', username);
                console.log(data);
                status = 200;
            }
        }
        res.status(status).end();
    });
}
exports.getAnimeList = getAnimeList;
function getMangaList(req, res) {
    res.status(200).end();
}
exports.getMangaList = getMangaList;
//# sourceMappingURL=list.js.map