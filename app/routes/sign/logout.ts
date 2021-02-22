import express from 'express'
import axios from 'axios'
import {app} from '../../app'
import {conn} from '../../maria'
import {IUser} from '../../model/user/Interface'
export const logoutRouter = express.Router()

logoutRouter.get(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('로그아웃 성공!')
        res.clearCookie("visitors")
        res.end()
    }
);