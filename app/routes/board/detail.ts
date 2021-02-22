import express from 'express'
import axios from 'axios'
import {app} from '../../app'
import {conn} from '../../maria'
import {IBoard} from '../../model/board/Interface'
import {IUser} from '../../model/user/Interface'
export const detailRouter = express.Router()

/**
 * test input
 */
const testData: IBoard = {
    id : 150
}

detailRouter.get(
    '/',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {        
        console.log('detail get')
        const sql = `SELECT	* FROM board WHERE ID =${testData.id}`;

        conn.query(sql, (err, rows) => {
            const result : undefined | any = rows[0]
            if(result === undefined){
                console.log('detail 검색 결과 없음')
            }else{
                const boardOut: IBoard = {
                    id: result.ID,
                    userid: result.USERID,
                    title: result.TITLE,
                    content: result.CONTENT,
                    createDt: result.CREATE_DT,
                    updateDt: result.UPDATE_DT,
                    deleteDt: result.DELETE_DT,
                }
                res.send(boardOut)
                console.log(boardOut)
            }
            res.end()
        })

    }
);