"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const maria_1 = require("../../maria");
const User_1 = require("../../model/user/User");
exports.joinRouter = express_1.default.Router();
/**
 * test
 */
const data = {
    userid: 'test111',
    password: '1q2w3e4r.d',
    name: 'TEST111'
};
exports.joinRouter.get('/', (req, res, next) => {
    console.log('join get');
    axios_1.default.post('/sign/join', data);
});
exports.joinRouter.post('/', (req, res, next) => {
    const body = req.body;
    const data = {
        userid: body.userid,
        password: body.password,
        name: body.name
    };
    const user = new User_1.User(data);
    const sql = `INSERT INTO user(USERID, PASSWORD, NAME, SALT) VALUES  ("${user.userid}","${user.password}","${user.name}",${user.salt})`;
    maria_1.conn.query(sql, (err, rows) => {
        res.end();
    });
});
