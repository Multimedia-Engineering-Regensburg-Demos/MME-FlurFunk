import * as SocketIO from "socket.io";
import { ServerMessage, BroadcastMessage } from "../shared/Message.js";

var ws,
    messages = [];

function onClientConnect(socket) {
    socket.on("message", onClientMessage.bind(socket));
    socket.emit("history", new ServerMessage(socket.id, messages));
}

function onClientMessage(message) {
    let _message = new BroadcastMessage(message.from, message.data, message.time);
    messages.push(_message);
    ws.emit("message", _message);
}

class FlurFunkServer {

    init(server) {
        ws = new SocketIO.Server(server);
        ws.on("connection", onClientConnect);
    }

}

export default new FlurFunkServer();