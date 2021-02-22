import express from 'express'
import axios from 'axios'
import {app} from '../../app'
import {conn} from '../../maria'
import {IBoard, IPage} from '../../model/board/Interface'
import {Board} from '../../model/board/Board'
import {IUser} from '../../model/user/Interface'
export const searchRouter = express.Router()

/**
 * test input
 */
const testData: IPage = {
    page: 1,
    count: 5
}

searchRouter.get(
    "/",
    (req: express.Request, res: express.Response, next: express.NextFunction) => {        
        console.log('search get')
        axios.post('/board/search', testData)
    }
);

searchRouter.post(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const reqData = req.body
        const limit: any = reqData.count
        const offset: any = (reqData.page as any - 1)*10
        const sql =     `SELECT * 
                        FROM board
                        WHERE DELETE_DT IS NULL
                        ORDER BY ID DESC
                        LIMIT ${limit} OFFSET ${offset}`;    

        conn.query(sql, (err, rows) => {
            let result: Array<Board> = []
            rows.forEach((value: any) => {
                result.push(
                    new Board({
                        id: value.ID,
                        userid: value.USERID,
                        title: value.TITLE,
                        content: value.CONTENT,
                        createDt: value.CREATE_DT,
                        updateDt: value.UPDATE_DT,
                        deleteDt: value.DELETE_DT,                    
                    })
                )
            });
            console.log(result)
            res.send(result)
            res.end()
        })
    }
);