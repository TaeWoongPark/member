"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
class AddUser {
    constructor(user) {
        this._salt = () => (this.salt || Math.round((new Date().valueOf() * Math.random()))) + "";
        this.getCrypto = (_salt, password) => (crypto_1.default.createHash("sha512").update(password + _salt).digest("hex"));
        this.salt = user.salt || this._salt();
        this.userid = user.userid;
        console.log(user.password);
        this.password = this.getCrypto(this.salt, user.password);
        this.name = user.name;
    }
}
exports.AddUser = AddUser;
