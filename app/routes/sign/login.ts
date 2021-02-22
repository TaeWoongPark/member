import express from 'express'
import axios from 'axios'
import {app} from '../../app'
import {conn} from '../../maria'
import {User} from '../../model/user/User'
import {IUser} from '../../model/user/Interface'
export const loginRouter = express.Router()

/**
 * test input
 */
const testData = {
    userid : 'ptw',
    password : '1q2w3e4r.d',
    name : 'park'
}

loginRouter.get(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {        
        console.log('login get')
        axios.post('/sign/login', testData)
    }
);

loginRouter.post(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const body = req.body
        const data = {
            userid : body.userid as string,
            password : body.password as string,
            name : body.name as string
        }
        const sql = `SELECT	*	FROM	user	WHERE	USERID ="${data.userid}"`;    

        conn.query(sql, (err, rows) => {
            const result = rows[0]
            const userIn: IUser = {
                userid: result.USERID as string,
                name: result.NAME as string,
                password: testData.password as string,
                salt: result.SALT as string
            }
            const user = new User(userIn);        
            // console.log('db password : ' + result.PASSWORD);
            // console.log('db.salt : ' + result.SALT);
            // console.log('user.password : ' + user.password);
            // console.log('user.salt : ' + user.salt);
            if((result.PASSWORD === user.password) && (result.SALT === user.salt)){
                
                console.log('로그인 성공!')
                res.cookie('visitors', userIn, {
                    maxAge: 10000
                })
            }else{
                console.log('로그인 실패...')
            }
        })
    }
);