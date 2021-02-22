"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
const mysql_1 = __importDefault(require("mysql"));
const axios_1 = __importDefault(require("axios"));
exports.conn = mysql_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'member',
    password: '1q2w3e!!',
    database: 'memberBoard'
});
/**
 * DB
 */
exports.conn.connect();
axios_1.default.defaults.baseURL = 'http://localhost:4000';
