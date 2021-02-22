import express from "express";
import {json, raw, text, urlencoded} from 'body-parser'
import helmet from 'helmet'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import redis from 'redis';
import {conn} from './maria'
import {joinRouter} from './routes/sign/join'
import {loginRouter} from './routes/sign/login'
import {logoutRouter} from './routes/sign/logout'
import {detailRouter} from './routes/board/detail'
import {mergeRouter} from './routes/board/merge'
import {searchRouter} from './routes/board/search'
import {deleteRouter} from './routes/board/delete'


// const joinRouter = require('./routes/sign/join');
export const app: express.Application = express();
app.use(cookieParser())
.use(json())
.use(raw())
.use(text())
.use(urlencoded())
.use(helmet())

/**
 * test
 */
app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    conn.query('select * from member', function(err, rows, fields) {
      if(!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    });
  }
);

// 아래 내용을 추가해주자!
app.use('/sign/join', joinRouter);        // 회원가입
app.use('/sign/login', loginRouter);      // 로그인
app.use('/sign/logout', logoutRouter);    // 로그아웃
app.use('/board/detail', detailRouter);   // 게시판 상세보기
app.use('/board/merge', mergeRouter);     // 게시판 추가/수정
app.use('/board/search', searchRouter);   // 게시판 검색
app.use('/board/delete', deleteRouter);   // 게시판 삭제



