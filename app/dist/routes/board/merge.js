"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const maria_1 = require("../../maria");
exports.mergeRouter = express_1.default.Router();
/**
 * test input
 */
const testData = {
    id: 1,
    userid: 'ptw',
    title: '오늘의 날씨',
    content: '따뜻함',
};
exports.mergeRouter.get("/", (req, res, next) => {
    console.log('merge get');
    axios_1.default.post('/board/merge', testData);
});
exports.mergeRouter.post('/', (req, res, next) => {
    const reqData = req.body;
    const sql = `INSERT INTO board (
                        id,
                        userid,
                        title,
                        content
                        )
                        VALUES (
                        ${reqData.id || 0},
                        '${reqData.userid}',
                        '${reqData.title}',
                        '${reqData.content}'
                        )
                        ON
                        DUPLICATE KEY
                        UPDATE
                        userid = '${reqData.userid}',
                        title = '${reqData.title}',
                        content = '${reqData.content}',
                        update_dt = now()`;
    maria_1.conn.query(sql, function (err, rows) {
        if (rows.affectedRows >= 2) {
            console.log('게시글이 수정되었습니다.');
        }
        else {
            console.log('게시글이 추가되었습니다.');
        }
        res.end();
    });
});
