"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Path = __importStar(require("path"));
const validator_1 = require("../util/validator");
const basePath = Path.resolve('./dist/temp-output-files/');
function downloadList(req, res) {
    const { fileName, list: type } = req.params;
    const isListTypeValid = validator_1.checkIsListTypeValid(type.toUpperCase());
    const areParamsValid = isListTypeValid && fileName;
    if (areParamsValid) {
        const pathToFile = Path.resolve(basePath, `./${type.toLowerCase()}`, `./${fileName}.xml`);
        const doesFileExist = validator_1.checkIfFileExists(pathToFile);
        if (doesFileExist) {
            return res.status(200).download(pathToFile);
            // todo: delete list after download,
        }
    }
    return res.status(404).end();
}
exports.default = downloadList;
//# sourceMappingURL=download-lists.js.map