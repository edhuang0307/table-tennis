// 型別與常數
type Direction = -1 | 0 | 1;
enum GameState {
    Begin, Prepare, Running, End,
};

const FPS = 1000 / 30;

// 宣告變數
const table = document.getElementById("table") as HTMLDivElement;
const net = document.getElementById("net") as HTMLDivElement;

const score1 = {
    element: document.getElementById("score1") as HTMLDivElement,
    value: 0,
}
const score2 = {
    element: document.getElementById("score2") as HTMLDivElement,
    value: 0,
}

const player1 = {
    paddle: document.getElementById("paddle1") as HTMLDivElement,
};
const player2 = {
    paddle: document.getElementById("paddle2") as HTMLDivElement,
    data: {
        /** 每幀的移動離 (像素)*/ 
        rate: 2,
        y: 0,
        direction: 1 as -1 | 0 | 1,
    },
};

const ball = {
    element: document.getElementById("ball") as HTMLDivElement,
    data: {
        /** 每幀移動的像素量 (= rate * direction) */
        rate: 6,
        start: player1 as typeof player1 | typeof player2,
        directionX: 0,
        directionY: 0, 
    }
};

let gameState = GameState.Begin;

// 宣告方法
function getValue(text: string, defaultValue = 0) {
    return +(text.match(/-?\d+/)?.[0] || defaultValue);
}

/** 取得元素的長、寬、邊寬 */
function getBorder(element: HTMLElement) {
    //NOTE getComputedStyle() 方法獲取指定元素的所有實際 (計算) CSS 屬性和值
    const { width, height, borderWidth } = getComputedStyle(element);
    return {
        width: getValue(width),
        height: getValue(height),
        borderWidth: getValue(borderWidth),
    };
}

/** 得分後重新發球 */
function reset(player: typeof player1 | typeof player2) {
    ball.data.start = player;
    ball.data.directionX = 0;
    ball.data.directionY = 0;
    player2.data.rate += 0.5;

    gameState = GameState.Prepare;
}

/** 更新分數 */
function updateScore(score: typeof score1 | typeof score2) {
    // if (ball.data.startX - +(ball.element.style.width) < 0)

    score.value++;
    score.element.textContent = `${ score.value }`;
}

// 初始化
reset(player1);

// 處理玩家的控制
table.addEventListener("mousemove", event => {
    const { borderWidth } = getBorder(table);
    const half = player1.paddle.offsetHeight / 2;    // = 球拍高度 / 2

    let y = event.offsetY;
    if (y < half) {
        y = half;
    }
    else if (y >= table.offsetHeight - half - borderWidth * 2) {
        y = table.offsetHeight - half - borderWidth * 2;
    }
    player1.paddle.style.top = `${ y - half }px`;
});
table.addEventListener("click", event => {
    if (gameState === GameState.Prepare) {
        ball.data.directionX = (ball.data.start === player1) ? -1 : 1;
        ball.data.directionY = Math.random() > 0.5 ? 1 : -1;

        gameState = GameState.Running;
    }
});

// 網頁載入完成時
addEventListener("load", event => {
    const { borderWidth } = getBorder(table);

    // 移動電腦
    setInterval(() => {
        if (player2.data.y >= table.offsetHeight - player2.paddle.offsetHeight - borderWidth * 2) 
            player2.data.direction = -1;
        
        else if (player2.data.y <= 0)
            player2.data.direction = 1;

        player2.data.y += player2.data.rate * player2.data.direction;
        player2.paddle.style.top = `${ player2.data.y }px`;
    }, FPS);

    // 移動球
    setInterval(() => {
        switch (gameState) {
            case GameState.Prepare: {
                const { top, left, width, height } = getComputedStyle(ball.data.start.paddle);
                const { width: ballWidth, height: ballHeight } = getComputedStyle(ball.element);

                ball.element.style.top = `${ getValue(top) + getValue(height) / 2 - getValue(ballHeight) / 2 }px`;

                // 根據發球者，決定球應該位於球拍的左或右側
                if (ball.data.start === player1)
                    ball.element.style.left = `${ getValue(left) - getValue(ballWidth) }px`;
                else ball.element.style.left = `${ getValue(left) + getValue(width) }px`;
                break;
            }
            case GameState.Running: {
                const { top, left, width, height } = getComputedStyle(table);
                const { top: ballTop, left: ballLeft, width: ballWidth, height: ballHeight } = getComputedStyle(ball.element);

                const { top: paddle1Top, left: paddle1Left, width: paddle1Width, height: paddle1Height } = getComputedStyle(player1.paddle);
                const { top: paddle2Top, left: paddle2Left, width: paddle2Width, height: paddle2Height } = getComputedStyle(player2.paddle);

                // 控制球 y 軸方向
                if (getValue(ballTop) <= 0)
                    ball.data.directionY = 1;
                else if (getValue(ballTop) + getValue(ballHeight) >= getValue(height))
                    ball.data.directionY = -1;

                const lastBallLeft = getValue(ballLeft) + ball.data.rate * ball.data.directionX;

                ball.element.style.top = `${ getValue(ballTop) + ball.data.rate * ball.data.directionY }px`;
                ball.element.style.left = `${ lastBallLeft }px`;

                //TODO 判斷球拍是否擊中球
                // 判斷球 x 軸
                // 介於 Player 2 的球拍厚度
                if (ball.data.directionX === -1 && getValue(ballLeft) > getValue(paddle2Left) && getValue(ballLeft) < getValue(paddle2Left) + getValue(paddle2Width)) {
                    if (getValue(ballTop) > getValue(paddle2Top) && getValue(ballTop) + getValue(ballHeight) < getValue(paddle2Top) + getValue(paddle2Height)) {
                        ball.data.directionX *= -1;
                    }
                }
                // 介於 Player 1 的球拍厚度
                else if (ball.data.directionX === 1 && getValue(ballLeft) + getValue(ballWidth) < getValue(paddle1Left) + getValue(paddle1Width) && getValue(ballLeft) + getValue(ballWidth) > getValue(paddle1Left)) {
                    if (getValue(ballTop) > getValue(paddle1Top) && getValue(ballTop) + getValue(ballHeight) < getValue(paddle1Top) + getValue(paddle1Height)) {
                        ball.data.directionX *= -1;
                    }
                }

                //TODO 僅有球拍未擊中球時，才判斷出界
                // 根據球 x 軸方向，決定遊戲狀態 (判斷出界)
                if (lastBallLeft >= getValue(width)) {
                    updateScore(score2);
                    reset(player2);
                }
                else if (lastBallLeft <= 0) {
                    updateScore(score1);
                    reset(player1);

                    player1.paddle.style.height = `${ getValue(paddle1Height) / window.innerWidth * 100 - 0.5 }vw`;
                    player2.paddle.style.height = `${ getValue(paddle2Height) / window.innerWidth * 100 + 0.5 }vw`;
                }
                break;
            }
        }
    }, FPS);
});
