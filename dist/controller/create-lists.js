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
const api_requests_1 = __importDefault(require("../util/api-requests"));
const file_handler_1 = __importDefault(require("../util/file-handler"));
const validator_1 = require("../util/validator");
function createList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, list } = req.params;
        const listInUpperCase = list.toUpperCase();
        const isListTypeValid = validator_1.checkIsListTypeValid(listInUpperCase);
        const areParamsValid = username && isListTypeValid;
        let status = 400;
        // todo errorhandling
        const responsePayload = { err: [], downloadPath: '' };
        if (areParamsValid) {
            const data = yield api_requests_1.default(username, listInUpperCase);
            if (data) {
                const fileName = file_handler_1.default(data, listInUpperCase, username);
                responsePayload.downloadPath = `/download-list/list/${list.toLowerCase()}/file/${fileName}`;
                status = 200;
            }
        }
        res.status(status).send(responsePayload);
    });
}
exports.default = createList;
//# sourceMappingURL=create-lists.js.map