"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const http_1 = require("http");
const port = Number(process.env.PORT) || 4000;
const server = http_1.createServer(app_1.app);
server.listen(port, () => {
    console.log(`${port} port open!`);
});
exports.default = server;
