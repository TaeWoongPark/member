import express from 'express'
import axios from 'axios'
import {app} from '../../app'
import {conn} from '../../maria'
import {IBoard} from '../../model/board/Interface'
import {IUser} from '../../model/user/Interface'
export const mergeRouter = express.Router()

/**
 * test input
 */
const testData: IBoard = {
    id : 1,
    userid: 'ptw',
    title: '오늘의 날씨',
    content: '따뜻함',
}

mergeRouter.get(
    "/",
    (req: express.Request, res: express.Response, next: express.NextFunction) => {        
        console.log('merge get')
        axios.post('/board/merge', testData)
    }
);

mergeRouter.post(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const reqData = req.body
        const sql =     `INSERT INTO board (
                        id,
                        userid,
                        title,
                        content
                        )
                        VALUES (
                        ${reqData.id||0},
                        '${reqData.userid}',
                        '${reqData.title}',
                        '${reqData.content}'
                        )
                        ON
                        DUPLICATE KEY
                        UPDATE
                        userid = '${reqData.userid}',
                        title = '${reqData.title}',
                        content = '${reqData.content}',
                        update_dt = now()`    
        conn.query(sql, function(err, rows) {        
            if(rows.affectedRows >= 2){
                console.log('게시글이 수정되었습니다.')
            }else{
                console.log('게시글이 추가되었습니다.')
            }
            res.end()
        })
    }
);