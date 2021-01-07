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
const validator_1 = require("./validator");
const data_transformer_1 = require("./data-transformer");
/**
 * Check if a file at a given path already exists.
 * If that is the case, then delete the file
 * @param path string
 */
function checkForFileAndDeleteFile(path) {
    if (validator_1.checkIfFileExists(path)) {
        FS.unlinkSync(path);
    }
}
function openEnvelope() {
    return '<?xml version="1.0" encoding="UTF-8" ?>\n<myanimelist>\n';
}
function closeEnvelope() {
    return '\n</myanimelist>';
}
/**
 * Create a hashed fileName.
 * This filename will include the username, actual date, type and a generated random string
 * @param type ListType
 * @param username string
 */
function createFileHashedName(type, username) {
    const randomString = Crypto.randomBytes(126).toString('hex');
    const fileName = `${calculate_date_1.default()}_${type.toLocaleLowerCase()}_${username}_${randomString}`;
    const hashedFileName = Crypto.createHash('sha256').update(fileName).digest('hex');
    return hashedFileName;
}
function writeListToXML(arrayOfItemLists = [], type = 'ANIME', username = '') {
    let fileName = '';
    const isListOfItemsValid = validator_1.checkIsListIsValid(arrayOfItemLists);
    const isTypeValid = validator_1.checkIsListTypeValid(type);
    const areParamsValid = isListOfItemsValid && isTypeValid && username;
    if (areParamsValid) {
        fileName = createFileHashedName(type, username);
        const filePath = Path.join(__dirname, `../temp-output-files/${type.toLowerCase()}/`, `${fileName}.xml`);
        checkForFileAndDeleteFile(filePath);
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
    }
    return fileName;
}
exports.default = writeListToXML;
//# sourceMappingURL=file-handler.js.map