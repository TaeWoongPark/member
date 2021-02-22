"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.joinRouter = express_1.default.Router();
const maria_1 = require("../../maria");
const addUser_1 = require("../../model/user/addUser");
exports.joinRouter.get("/", (req, res, next) => {
    console.log('get');
    const data = {
        userid: 'ptw',
        password: '1q2w3e4r.d',
        name: 'park'
    };
    axios_1.default.defaults.baseURL = 'http://localhost:4000';
    axios_1.default.defaults.params = data;
    axios_1.default.post('/sign/join');
});
exports.joinRouter.post('/', function (req, res, next) {
    console.log(req.query);
    const data = {
        userid: req.query.userid,
        password: req.query.password,
        name: req.query.name
    };
    const user = new addUser_1.AddUser(data);
    const sql = `INSERT INTO user(USERID, PASSWORD, NAME, SALT) VALUES  ("${user.userid}","${user.password}","${user.name}",${user.salt})`;
    console.log('sql : ' + sql);
    maria_1.conn.query(sql, function (err, rows) {
        // console.log(rows);
    });
});
