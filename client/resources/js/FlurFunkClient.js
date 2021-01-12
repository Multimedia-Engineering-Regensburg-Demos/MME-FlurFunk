/* eslint-env browser */

import { Observable, Event } from "/shared/Observable.js";
import { Message, ClientMessage } from "/shared/Message.js";

function onHistory(message) {
    this.id = message.to;
    this.notifyAll(new Event("history", Message.fromJSON(message)));
}

function onMessage(message) {
    this.notifyAll(new Event("message", Message.fromJSON(message)));
}

class FlurFunkClient extends Observable {

    constructor() {
        super();
    }

    connect() {
        this.ws = io();
        this.ws.on("history", onHistory.bind(this));
        this.ws.on("message", onMessage.bind(this));
    }

    send(message) {
        this.ws.emit("message", new ClientMessage(this.id, message));
    }

}

export default new FlurFunkClient();