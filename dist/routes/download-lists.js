"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const download_lists_1 = __importDefault(require("../controller/download-lists"));
const router = express_1.Router({ mergeParams: true });
router.route('/file/:fileName').get(download_lists_1.default);
exports.default = router;
//# sourceMappingURL=download-lists.js.map