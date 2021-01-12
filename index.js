import express from "express";
import http from "http";
import FlurFunkServer from "./server/FlurFunkServer.js";

const APP_DIR = "client",
    SHARED_DIR = "shared",
    PORT = 3000;

var app,
    server;

function start() {
    initApplicationServer();
    initFlurFunkServer();
}

function initApplicationServer() {
    app = express();
    app.use("/app", express.static(APP_DIR));
    app.use("/shared", express.static(SHARED_DIR));
    server = http.createServer(app);
    server.listen(PORT);
}

function initFlurFunkServer() {
    FlurFunkServer.init(server);
}

start();