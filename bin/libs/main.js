"use strict";
const table = document.getElementById("table");
const net = document.getElementById("net");
const ball = document.getElementById("ball");
const player1 = {
    paddle: document.getElementById("paddle-01"),
    score: document.getElementById("score-01"),
};
const player2 = {
    paddle: document.getElementById("paddle-02"),
    score: document.getElementById("score-02"),
};
// const half = player1.paddle.offsetHeight / 2
// function clamp(value: number, max: number, min: number) {
//     //todo 當 Value 大於 max，回傳 max; 當小於 min，回傳 mins，否則依舊是 value
//     let y = event.offsetY as number;
//     if (y < half) {
//         y = half ;
//     }
//     else if (y >= table.offsetHeight - half - vwToPx * 2) {
//         y = table.offsetHeight - half - vwToPx * 2;
//     }
// }
table.addEventListener("mousemove", (event) => {
    //todo 處理 table. style.border, 去單位 >> 字串轉數字 * 2
    table.style.border = "13px solid lightslategray";
    const border = table.style.border;
    let result1 = "";
    for (let i = 0; i < border.length; i++) {
        if (border[i].match(/[0-9.]/)) {
            result1 += border[i];
        }
    }
    const strToNum = +result1;
    const half = player1.paddle.offsetHeight / 2;
    let y = event.offsetY;
    if (y < half) {
        y = half;
    }
    else if (y >= table.offsetHeight - half - strToNum * 2) {
        y = table.offsetHeight - half - strToNum * 2;
    }
    // const y = event.offsetY - player1.paddle.offsetHeight / 2;
    player1.paddle.style.top = `${y - half}px`;
});
//# sourceMappingURL=main.js.map