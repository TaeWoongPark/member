"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const maria_1 = require("../../maria");
exports.detailRouter = express_1.default.Router();
/**
 * test input
 */
const testData = {
    id: 150
};
exports.detailRouter.get('/', (req, res, next) => {
    console.log('detail get');
    axios_1.default.post('/board/detail', testData);
});
exports.detailRouter.post('/', (req, res, next) => {
    const reqData = req.body;
    const sql = `SELECT	* FROM board WHERE ID =${reqData.id}`;
    maria_1.conn.query(sql, (err, rows) => {
        const result = rows[0];
        if (result === undefined) {
            console.log('detail 검색 결과 없음');
        }
        else {
            const boardOut = {
                id: result.ID,
                userid: result.USERID,
                title: result.TITLE,
                content: result.CONTENT,
                createDt: result.CREATE_DT,
                updateDt: result.UPDATE_DT,
                deleteDt: result.DELETE_DT,
            };
            res.send(boardOut);
            console.log(boardOut);
        }
        res.end();
    });
});
