import {IUser} from './Interface'
import crypto from 'crypto'
export class User { 
    salt: any
    userid: string
    password: string
    name: string

    constructor(user: IUser) {
        this.salt = user.salt || this._salt();
        this.userid = user.userid;
        this.password = this.getCrypto(this.salt, user.password);
        this.name = user.name;
    }

    _salt = () => (this.salt || Math.round((new Date().valueOf() * Math.random()))) + "";

    getCrypto = (_salt: any, password: string) => (crypto.createHash("sha512").update(password + _salt).digest("hex"));
}