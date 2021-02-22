import express from 'express'
import axios from 'axios'
import {app} from '../../app'
import {conn} from '../../maria'
import {IUser} from '../../model/user/Interface'


export const logoutRouter = express.Router()

logoutRouter.get(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.clearCookie("visitors")
    }
);

logoutRouter.post(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {

    }    
);