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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Path = __importStar(require("path"));
const FS = __importStar(require("fs"));
const Crypto = __importStar(require("crypto"));
const calculate_date_1 = __importDefault(require("./calculate-date"));
const data_transformer_1 = require("./data-transformer");
const possibleLists = ['ANIME', 'MANGA'];
function openEnvelope() {
    return '<?xml version="1.0" encoding="UTF-8" ?>\n<myanimelist>\n';
}
function closeEnvelope() {
    return '\n</myanimelist>';
}
function writeListToXML(arrayOfItemLists = [], type = 'ANIME', username = '') {
    let fileName = '';
    const isListOfItemsValid = arrayOfItemLists
        && Array.isArray(arrayOfItemLists) && arrayOfItemLists.length > 0;
    const isTypeValid = type && possibleLists.includes(type);
    const areParamsValid = isListOfItemsValid && isTypeValid && username;
    if (areParamsValid) {
        const typeInLowerCase = type.toLocaleLowerCase();
        fileName = `${calculate_date_1.default()}_${typeInLowerCase}_${username}`;
        const hashedFileName = Crypto.createHash('sha256').update(fileName).digest('hex');
        const filePath = Path.join(__dirname, `../temp-output-files/${typeInLowerCase}/`, `${hashedFileName}.xml`);
        const writeStream = FS.createWriteStream(filePath);
        writeStream.write(openEnvelope());
        const calculatedUserData = Object.assign({ username }, data_transformer_1.calcListStats(arrayOfItemLists));
        writeStream.write(data_transformer_1.calcUserInfoFormat(Object.assign(Object.assign({}, calculatedUserData), { type })));
        const selectedTransformation = type === 'MANGA' ? data_transformer_1.calcMangaFormat : data_transformer_1.calcAnimeFormat;
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
        fileName = hashedFileName;
    }
    return fileName;
}
exports.default = writeListToXML;
//# sourceMappingURL=file-writer.js.map