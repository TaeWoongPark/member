"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const maria_1 = require("./maria");
const join_1 = require("./routes/sign/join");
const login_1 = require("./routes/sign/login");
const logout_1 = require("./routes/sign/logout");
const detail_1 = require("./routes/board/detail");
const merge_1 = require("./routes/board/merge");
const search_1 = require("./routes/board/search");
const delete_1 = require("./routes/board/delete");
// const joinRouter = require('./routes/sign/join');
exports.app = express_1.default();
exports.app.use(cookie_parser_1.default())
    .use(body_parser_1.json())
    .use(body_parser_1.raw())
    .use(body_parser_1.text())
    .use(body_parser_1.urlencoded())
    .use(helmet_1.default());
/**
 * test
 */
exports.app.get("/", (req, res, next) => {
    maria_1.conn.query('select * from member', function (err, rows, fields) {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log("err : " + err);
            res.send(err);
        }
    });
});
// 아래 내용을 추가해주자!
exports.app.use('/sign/join', join_1.joinRouter); // 회원가입
exports.app.use('/sign/login', login_1.loginRouter); // 로그인
exports.app.use('/sign/logout', logout_1.logoutRouter); // 로그아웃
exports.app.use('/board/detail', detail_1.detailRouter); // 게시판 상세보기
exports.app.use('/board/merge', merge_1.mergeRouter); // 게시판 추가/수정
exports.app.use('/board/search', search_1.searchRouter); // 게시판 검색
exports.app.use('/board/delete', delete_1.deleteRouter); // 게시판 삭제
