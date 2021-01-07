"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_lists_1 = __importDefault(require("./routes/create-lists"));
const download_lists_1 = __importDefault(require("./routes/download-lists"));
const folder_creator_1 = __importDefault(require("./util/folder-creator"));
(function main() {
    folder_creator_1.default();
    // todo dotenv
    // todo logger
    // todo redis cache
    const port = process.env.PORT || 9000;
    const app = express_1.default();
    app.use('/create-list/user/:username/list/:list', create_lists_1.default);
    app.use('/download-list/list/:list', download_lists_1.default);
    app.listen(port, () => {
        console.log(`Server is running on Port: ${port}`);
    });
}());
//# sourceMappingURL=app.js.map