/* eslint-env browser */

import FlurFunkClient from "./FlurFunkClient.js";

const MESSAGE_TEMPLATE = document.querySelector("#message-template").innerHTML.trim();

var boardEl,
    messageEl;

function onMessageHistoryReceived(event) {
    initUI();
    event.data.data.forEach(message => addMessageToBoard(message));
}

function onMessage(event) {
    addMessageToBoard(event.data);
}

function onMessageSend(event) {
    if (messageEl.value === "") {
        return;
    }
    FlurFunkClient.send(messageEl.value);
    messageEl.value = "";
}

function addMessageToBoard(message) {
    let date = new Date(message.data.time),
        tmpElement = document.createElement("div"),
        messageElement;
    tmpElement.innerHTML = MESSAGE_TEMPLATE;
    messageElement = tmpElement.firstChild;
    messageElement.querySelector(".date-value").innerHTML = date;
    messageElement.querySelector(".from-value").innerHTML = message.from;
    messageElement.querySelector(".text").innerHTML = message.data;
    boardEl.insertBefore(messageElement, boardEl.firstChild);
}

function init() {
    initFlurFunk();
}

function initUI() {
    let sendMessageButton = document.querySelector(".editor input");
    boardEl = document.querySelector(".board");
    messageEl = document.querySelector(".editor textarea");
    sendMessageButton.addEventListener("click", onMessageSend);
}

function initFlurFunk() {
    FlurFunkClient.addEventListener("history", onMessageHistoryReceived);
    FlurFunkClient.addEventListener("message", onMessage);
    FlurFunkClient.connect();
}

init();