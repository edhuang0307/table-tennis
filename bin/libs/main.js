"use strict";
var GameState;
(function (GameState) {
    GameState[GameState["Begin"] = 0] = "Begin";
    GameState[GameState["Prepare"] = 1] = "Prepare";
    GameState[GameState["Running"] = 2] = "Running";
    GameState[GameState["End"] = 3] = "End";
})(GameState || (GameState = {}));
;
const FPS = 1000 / 30;
// 宣告變數
const table = document.getElementById("table");
const net = document.getElementById("net");
const score1 = {
    element: document.getElementById("score1"),
    value: 0,
};
const score2 = {
    element: document.getElementById("score2"),
    value: 0,
};
const player1 = {
    paddle: document.getElementById("paddle1"),
};
const player2 = {
    paddle: document.getElementById("paddle2"),
    data: {
        /** 每幀的移動離 (像素)*/
        rate: 2,
        y: 0,
        direction: 1,
    },
};
const ball = {
    element: document.getElementById("ball"),
    data: {
        /** 每幀移動的像素量 (= rate * direction) */
        rate: 6,
        start: player1,
        directionX: 0,
        directionY: 0,
    }
};
let gameState = GameState.Begin;
// 宣告方法
function getValue(text, defaultValue = 0) {
    var _a;
    return +(((_a = text.match(/-?\d+/)) === null || _a === void 0 ? void 0 : _a[0]) || defaultValue);
}
/** 取得元素的長、寬、邊寬 */
function getBorder(element) {
    //NOTE getComputedStyle() 方法獲取指定元素的所有實際 (計算) CSS 屬性和值
    const { width, height, borderWidth } = getComputedStyle(element);
    return {
        width: getValue(width),
        height: getValue(height),
        borderWidth: getValue(borderWidth),
    };
}
/** 得分後重新發球 */
function reset(player) {
    ball.data.start = player;
    ball.data.directionX = 0;
    ball.data.directionY = 0;
    ball.data.rate = 6; //TODO 越來越快
    gameState = GameState.Prepare;
}
/** 更新分數 */
function updateScore(score) {
    // if (ball.data.startX - +(ball.element.style.width) < 0)
    score.value++;
    score.element.textContent = `${score.value}`;
}
// 初始化
reset(player1);
// 處理玩家的控制
table.addEventListener("mousemove", event => {
    const { borderWidth } = getBorder(table);
    const half = player1.paddle.offsetHeight / 2; // = 球拍高度 / 2
    let y = event.offsetY;
    if (y < half) {
        y = half;
    }
    else if (y >= table.offsetHeight - half - borderWidth * 2) {
        y = table.offsetHeight - half - borderWidth * 2;
    }
    player1.paddle.style.top = `${y - half}px`;
});
table.addEventListener("click", event => {
    if (gameState === GameState.Prepare && ball.data.start === player1) {
        ball.data.directionX = -1;
        ball.data.directionY = Math.random() > 0.5 ? 1 : -1;
        gameState = GameState.Running;
    }
});
// 網頁載入完成時
addEventListener("load", event => {
    const { borderWidth } = getBorder(table);
    // 移動電腦
    setInterval(() => {
        if (player2.data.y >= table.offsetHeight - player1.paddle.offsetHeight - borderWidth * 2)
            player2.data.direction = -1;
        else if (player2.data.y <= 0)
            player2.data.direction = 1;
        player2.data.y += player2.data.rate * player2.data.direction;
        player2.paddle.style.top = `${player2.data.y}px`;
    }, FPS);
    // 移動球
    setInterval(() => {
        switch (gameState) {
            case GameState.Prepare: {
                if (ball.data.start === player1) {
                    const { top, left, height } = getComputedStyle(ball.data.start.paddle);
                    const { width: ballWidth, height: ballHeight } = getComputedStyle(ball.element);
                    ball.element.style.top = `${getValue(top) + getValue(height) / 2 - getValue(ballHeight) / 2}px`;
                    ball.element.style.left = `${getValue(left) - getValue(ballWidth)}px`;
                }
                else {
                    //TODO 跟著 player2
                }
                break;
            }
            case GameState.Running: {
                const { top, left, width, height } = getComputedStyle(table);
                const { top: ballTop, left: ballLeft, width: ballWidth, height: ballHeight } = getComputedStyle(ball.element);
                // 控制球 y 軸方向
                if (getValue(ballTop) <= 0)
                    ball.data.directionY = 1;
                else if (getValue(ballTop) >= getValue(height))
                    ball.data.directionY = -1;
                console.log(getValue(ballTop), ball.data.directionY);
                const lastBallLeft = getValue(ballLeft) + ball.data.rate * ball.data.directionX;
                ball.element.style.top = `${getValue(ballTop) + ball.data.rate * ball.data.directionY}px`;
                ball.element.style.left = `${lastBallLeft}px`;
                //TODO 判斷球拍是否擊中球
                //TODO 僅有球拍未擊中球時，才判斷出界
                // 根據球 x 軸方向，決定遊戲狀態 (判斷出界)
                if (lastBallLeft >= getValue(width))
                    reset(player2);
                else if (lastBallLeft <= 0)
                    reset(player2);
                break;
            }
        }
    }, FPS);
});
//# sourceMappingURL=main.js.map