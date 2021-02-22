import express from 'express'
import axios from 'axios'
import {conn} from '../../maria'
import {User} from '../../model/user/User'
import {IUser} from '../../model/user/Interface'
export const joinRouter = express.Router()

/**
 * test
 */
const data = {
    userid : 'test',
    password : '1q2w3e4r.d',
    name : 'TEST'
}

joinRouter.get(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {        
        console.log('join get')
        axios.post('/sign/join', data)
    }
);

joinRouter.post(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const body = req.body
        const data = {
            userid : body.userid as string,
            password : body.password as string,
            name : body.name as string
            
        }

        const user = new User(data);
        const sql = `INSERT INTO user(USERID, PASSWORD, NAME, SALT) VALUES  ("${user.userid}","${user.password}","${user.name}",${user.salt})`;
        conn.query(sql, (err, rows) => {
        })
    }
);