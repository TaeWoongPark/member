"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const maria_1 = require("../../maria");
exports.deleteRouter = express_1.default.Router();
/**
 * test input
 */
const testData = {
    id: 1
};
exports.deleteRouter.get('/', (req, res, next) => {
    console.log('delete get');
    axios_1.default.post('/board/delete', testData);
});
exports.deleteRouter.post('/', (req, res, next) => {
    const reqData = req.body;
    const sql = `UPDATE board SET delete_dt = NOW() WHERE id=${reqData.id}`;
    maria_1.conn.query(sql, (err, rows) => {
        console.log(rows);
        if (rows.affectedRows >= 1) {
            console.log('게시글이 삭제되었습니다.');
        }
        else {
            console.log('삭제할 게시물이 존재하지 않습니다.');
        }
        res.end();
    });
});
