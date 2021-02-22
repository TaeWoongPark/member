"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = __importDefault(require("express"));
const maria_1 = require("../../maria");
const User_1 = require("../../model/user/User");
exports.loginRouter = express_1.default.Router();
/**
 * test input
 */
const testData = {
    userid: 'ptw',
    password: '1q2w3e4r.d',
    name: 'park'
};
exports.loginRouter.get('/', (req, res, next) => {
    console.log('login get');
    const body = testData;
    const data = {
        userid: body.userid,
        password: body.password,
        name: body.name
    };
    const sql = `SELECT	*	FROM	user	WHERE	USERID ="${data.userid}"`;
    maria_1.conn.query(sql, (err, rows) => {
        const result = rows[0];
        const userIn = {
            userid: result.USERID,
            name: result.NAME,
            password: testData.password,
            salt: result.SALT
        };
        const user = new User_1.User(userIn);
        // console.log('db password : ' + result.PASSWORD);
        // console.log('db.salt : ' + result.SALT);
        // console.log('user.password : ' + user.password);
        // console.log('user.salt : ' + user.salt);
        if ((result.PASSWORD === user.password) && (result.SALT === user.salt)) {
            console.log('로그인 성공!');
            res.cookie('visitors', userIn, {
                maxAge: 10000
            });
        }
        else {
            console.log('로그인 실패...');
        }
        res.end();
    });
});
