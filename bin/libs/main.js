"use strict";
const fps = 1000 / 30;
const table = document.getElementById("table");
const net = document.getElementById("net");
const ball = {
    ball: document.getElementById("ball"),
    data: {
        rate: 6,
        x: 0,
        y: 0,
        directionX: 1,
        directionY: 1,
    }
};
const player1 = {
    paddle: document.getElementById("paddle1"),
    score: document.getElementById("score1"),
};
const player2 = {
    paddle: document.getElementById("paddle2"),
    score: document.getElementById("score2"),
    data: {
        /** 每幀的移動離 (像素)*/
        rate: 2,
        y: 0,
        direction: 1,
    },
};
// let tool = {
//     border: getComputedStyle(table).borderWidth,
//     width: +(this.border.match(/\d+/)![0]),
//     getBorder: function () {
//         const border = this.border;
//     },
//     getWidth: function () {
//         const width = this.width;
//     },
// }
// 玩家跟電腦有同樣常數，宣告方法
function borderAndWidth(t) {
    var _a;
    const border = getComputedStyle(t).borderWidth;
    const width = +(((_a = border.match(/\d+/)) === null || _a === void 0 ? void 0 : _a[0]) || 0);
}
// note getComputedStyle() 方法獲取指定元素的所有實際（計算）CSS 屬性和值。
// 處理玩家的控制
table.addEventListener("mousemove", (event) => {
    // borderAndWidth(table);
    var _a;
    const border = getComputedStyle(table).borderWidth; // 先取出 13px
    const width = +(((_a = border.match(/\d+/)) === null || _a === void 0 ? void 0 : _a[0]) || 0);
    const half = player1.paddle.offsetHeight / 2; // 球拍高度 / 2
    let y = event.offsetY;
    if (y < half) {
        y = half;
    }
    else if (y >= table.offsetHeight - half - width * 2) {
        y = table.offsetHeight - half - width * 2;
    }
    player1.paddle.style.top = `${y - half}px`;
});
// 得分後重新發球
function reset() {
    ball.data.x = +(table.style.width) / 2;
    ball.data.y = +(table.style.height) / 2;
    ball.data.directionX = -ball.data.directionX;
    ball.data.rate = 6;
}
addEventListener("load", event => {
    // 移動電腦
    const border = getComputedStyle(table).borderWidth;
    const width = +border.match(/\d+/)[0]; // ! 表示一定找得到資料
    setInterval(() => {
        if (player2.data.y >= table.offsetHeight - player1.paddle.offsetHeight - width * 2)
            player2.data.direction = -1;
        else if (player2.data.y <= 0)
            player2.data.direction = 1;
        player2.data.y += player2.data.rate * player2.data.direction;
        player2.paddle.style.top = `${player2.data.y}px`;
    }, fps);
    // 移動球
    setInterval(() => {
        // 控制球 y 軸方向
        if (ball.data.y >= table.clientHeight - 25)
            ball.data.directionY = -1;
        else if (ball.data.y <= 0)
            ball.data.directionY = 1;
        ball.data.y += ball.data.rate * ball.data.directionY;
        ball.ball.style.top = `${ball.data.y}px`;
        // 控制球 x 軸方向
        if (ball.data.x >= table.offsetWidth - ball.ball.offsetWidth - 25) {
            reset(); // 重新開球
            ball.data.directionX = -1;
        }
        else if (ball.data.x <= 0) {
            reset(); // 重新開球
            ball.data.directionX = 1;
        }
        ball.data.x += ball.data.rate * ball.data.directionX;
        ball.ball.style.left = `${ball.data.x}px`;
    }, fps);
});
// 更新分數
function updateScore() {
    if (ball.data.x - +(ball.ball.style.width) < 0) {
        // player1.score.innerText++
        reset();
    }
}
//# sourceMappingURL=main.js.map