"use strict";
var fps = 1000 / 30;
var table = document.getElementById("table");
var net = document.getElementById("net");
var ball = {
    ball: document.getElementById("ball"),
    data: {
        rate: 6,
        point: [0, 0],
        direction: [1, 1],
    }
};
var player1 = {
    paddle: document.getElementById("paddle1"),
    score: document.getElementById("score1"),
};
var player2 = {
    paddle: document.getElementById("paddle2"),
    score: document.getElementById("score2"),
    data: {
        /** 每幀的移動離 (像素)*/
        rate: 2,
        y: 0,
        direction: 1,
    },
};
var tool = {
    border: getComputedStyle(table).borderWidth,
    width: +(this.border.match(/\d+/)[0]),
    getBorder: function () {
        var border = this.border;
    },
    getWidth: function () {
        var width = this.width;
    },
};
// note getComputedStyle() 方法獲取指定元素的所有實際（計算）CSS 屬性和值。
// 處理玩家的控制
table.addEventListener("mousemove", function (event) {
    // const border = getComputedStyle(table).borderWidth; // 先取出 13px
    // const width = +border.match(/\d+/)![0]; // ! 表示一定找得到資料; 再取出 13，轉成 number
    // const width = +(border.match(/\d+/)?.[0] || 0);  
    tool.getBorder();
    tool.getWidth();
    var half = player1.paddle.offsetHeight / 2; // 球拍高度 / 2
    var y = event.offsetY;
    if (y < half) {
        y = half;
    }
    else if (y >= table.offsetHeight - half - width * 2) {
        y = table.offsetHeight - half - width * 2;
    }
    player1.paddle.style.top = y - half + "px";
});
window.addEventListener("load", function (event) {
    // 移動電腦
    var border = getComputedStyle(table).borderWidth;
    var width = +border.match(/\d+/)[0]; // ! 表示一定找得到資料
    setInterval(function () {
        if (player2.data.y >= table.offsetHeight - player1.paddle.offsetHeight - width * 2)
            player2.data.direction = -1;
        else if (player2.data.y <= 0)
            player2.data.direction = 1;
        player2.data.y += player2.data.rate * player2.data.direction;
        player2.paddle.style.top = player2.data.y + "px";
    }, fps);
    // 移動球
    setInterval(function () {
        // 控制球 y 軸方向
        if (ball.data.point[1] >= table.offsetHeight - ball.ball.offsetHeight - 25)
            ball.data.direction[1] = -1;
        else if (ball.data.point[1] <= 0)
            ball.data.direction[1] = 1;
        ball.data.point[1] += ball.data.rate * ball.data.direction[1];
        ball.ball.style.top = ball.data.point[1] + "px";
        // 控制球 x 軸方向
        if (ball.data.point[0] >= table.offsetWidth - ball.ball.offsetWidth - 25)
            ball.data.direction[0] = -1;
        else if (ball.data.point[0] <= 0)
            ball.data.direction[0] = 1;
        ball.data.point[0] += ball.data.rate * ball.data.direction[0];
        ball.ball.style.left = ball.data.point[0] + "px";
    }, fps);
});
