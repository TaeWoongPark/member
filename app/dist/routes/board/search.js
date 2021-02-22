"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const express_1 = __importDefault(require("express"));
const maria_1 = require("../../maria");
const Board_1 = require("../../model/board/Board");
exports.searchRouter = express_1.default.Router();
/**
 * test input
 */
const testData = {
    page: 1,
    count: 5
};
exports.searchRouter.get("/", (req, res, next) => {
    console.log('search get');
    const limit = testData.count;
    const offset = (testData.page - 1) * 10;
    const sql = `SELECT * 
                        FROM board
                        WHERE DELETE_DT IS NULL
                        ORDER BY ID DESC
                        LIMIT ${limit} OFFSET ${offset}`;
    maria_1.conn.query(sql, (err, rows) => {
        let result = [];
        rows.forEach((value) => {
            result.push(new Board_1.Board({
                id: value.ID,
                userid: value.USERID,
                title: value.TITLE,
                content: value.CONTENT,
                createDt: value.CREATE_DT,
                updateDt: value.UPDATE_DT,
                deleteDt: value.DELETE_DT,
            }));
        });
        console.log(result);
        res.send(result);
        res.end();
    });
});
