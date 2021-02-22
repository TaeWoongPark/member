import {IBoard} from './Interface'
export class Board { 
    id?: number | null
    userid?: string    
    title?: string
    content?: string
    createDt?: string
    updateDt?: string
    deleteDt?: string

    constructor(board: IBoard) {
        this.id = board.id
        this.userid= board.userid
        this.title= board.title
        this.content= board.content
        this.createDt= board.createDt
        this.updateDt= board.updateDt
        this.deleteDt= board.deleteDt
    }
}