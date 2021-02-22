"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor(board) {
        this.id = board.id;
        this.userid = board.userid;
        this.title = board.title;
        this.content = board.content;
        this.createDt = board.createDt;
        this.updateDt = board.updateDt;
        this.deleteDt = board.deleteDt;
    }
}
exports.Board = Board;
