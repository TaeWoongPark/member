import express from 'express'
import axios from 'axios'
import {app} from '../../app'
import {conn} from '../../maria'
import {IBoard} from '../../model/board/Interface'
import {IUser} from '../../model/user/Interface'
export const deleteRouter = express.Router()

/**
 * test input
 */
const testData: IBoard = {
    id : 1
}

deleteRouter.get(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {        
        console.log('delete get')
        axios.post('/board/delete', testData)
    }
);

deleteRouter.post(
    '/'
    , (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const reqData = req.body
        const sql = `UPDATE board SET delete_dt = NOW() WHERE id=${reqData.id}`;    

        conn.query(sql, (err, rows) => {
            console.log(rows)
            if(rows.affectedRows >= 1){
                console.log('게시글이 삭제되었습니다.')
            }else{
                console.log('삭제할 게시물이 존재하지 않습니다.')
            }
            res.end()
        })
    }
);