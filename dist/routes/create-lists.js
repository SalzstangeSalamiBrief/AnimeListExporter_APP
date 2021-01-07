"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_lists_1 = __importDefault(require("../controller/create-lists"));
const router = express_1.Router({ mergeParams: true });
router.route('/').post(create_lists_1.default);
exports.default = router;
//# sourceMappingURL=create-lists.js.map