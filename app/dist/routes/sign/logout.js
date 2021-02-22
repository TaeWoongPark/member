"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.logoutRouter = express_1.default.Router();
exports.logoutRouter.get('/', (req, res, next) => {
    console.log('로그아웃 성공!');
    res.clearCookie("visitors");
    res.end();
});
