"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRouter = void 0;
// 이 파일을 라우터로 사용할 것 이기에 아래 두개를 불러와준다.
const express_1 = __importDefault(require("express"));
exports.joinRouter = express_1.default.Router();
// 데이터베이스 접속을 위해 maria.js를 불러온다
const maria_1 = require("../../maria");
const addUser_1 = require("../../model/user/addUser");
// /join 으로 get 접속하면 views/login/join.pug 를 렌더링해준다.
// join.pug 는 추후 접속한다.
exports.joinRouter.get("/", (req, res, next) => {
    // res.render('login/join');
    console.log('get');
});
// /join 으로 post 접속하면 아래와 같은 동작을 수행한다.
exports.joinRouter.post('/', function (req, res, next) {
    console.log('post');
    // addUser 를 불러온다. req.body 는 axios 를 통해 클라이언트 측에서 넘겨줄 데이터이다.
    const user = new addUser_1.AddUser(req.body);
    // sql 문은 아래와 같다. ES6의 템플릿 문자열을 사용해서 복잡하게 쓰지 않고 한줄로 적어준다.
    // 테이블의 ID 값은 자동으로 증가(AUTO_INCREMENT)하기에 안적어줘도 된다.
    const sql = `INSERT INTO user(USERID, PASSWORD, NAME, SALT) VALUES  ("${user.userid}","${user.password}","${user.name}",${user.salt})`;
    maria_1.conn.query(sql, function (err, rows) {
        // 데이터가 잘 들어갔는지 확인을 위해 로그를 찍어준다.
        console.log(rows);
        // 에러가 없다면 "1"을 있다면 "0"을 반환한다.
        // 이는 크게 상관없다.
        if (!err) {
            res.send("1");
        }
        else {
            res.send("0");
        }
        ;
    });
});
