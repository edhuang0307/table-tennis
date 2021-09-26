"use strict";
const table = document.getElementById("table");
const net = document.getElementById("net");
const ball = document.getElementById("ball");
const player01 = {
    paddle: document.getElementById("paddle-01"),
    score: document.getElementById("score-01"),
};
const player02 = {
    paddle: document.getElementById("paddle-02"),
    score: document.getElementById("score-02"),
};
table.addEventListener("mousemove", (event) => {
    event.movementX, event.movementY;
    console.log(event.movementX, event.movementY);
});
//# sourceMappingURL=main.js.map