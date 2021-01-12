class Message {
    constructor(from, to, data, time) {
        this.from = from;
        this.to = to;
        this.data = data;
        this.time = time;
        Object.freeze(this);
    }

    static fromJSON(json) {
        return new Message(json.from, json.to, json.data, json.time);
    }
}

class ClientMessage extends Message {

    constructor(id, data) {
        super(id, "all", data, Date.now());
    }

}

class ServerMessage extends Message {

    constructor(to, data) {
        super("server", to, data, Date.now());
    }

}

class BroadcastMessage extends Message {

    constructor(id, data, time) {
        super(id, "all", data, time);
    }
}

export { Message, ClientMessage, ServerMessage, BroadcastMessage };