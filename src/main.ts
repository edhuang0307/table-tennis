type Direction = -1 | 0 | 1;

const fps = 1000 / 30;

const table = document.getElementById("table") as HTMLDivElement;
const net = document.getElementById("net") as HTMLDivElement;
const ball = document.getElementById("ball") as HTMLDivElement;

/** 玩家 */
const player1 = {
    paddle: document.getElementById("paddle1") as HTMLDivElement,
    score: document.getElementById("score1") as HTMLDivElement,
};

/** NPC */
const player2 = {
    paddle: document.getElementById("paddle2") as HTMLDivElement,
    score: document.getElementById("score2") as HTMLDivElement,
    data: {
        /** 每幀的移動距離 (像素) */
        rate: 1,
        y: 0,
        direction: 1 as Direction,
    },
};

const ballData = {
    /** 每幀的移動距離 (像素) */
    rate: 1,
    point: [0, 0] as [x: number, y: number],
    direction: [1, 1] as [x: Direction, y: Direction],
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

// 處理玩家的控制
// table.onmousemove
table.addEventListener("mousemove", event => {
    const border = getComputedStyle(table).borderWidth;
    const width = +(border.match(/\d+/)?.[0] || 0);
    // const width = +border.match(/\d+/)![0];

    const half = player1.paddle.offsetHeight / 2;

    let y = event.offsetY;
    if (y < half) {
        y = half;
    }
    else if (y >= table.offsetHeight - half - width * 2) {
        y = table.offsetHeight - half - width * 2;
    }

    player1.paddle.style.top = `${ y - half }px`;
})

// window.onload
addEventListener("load", event => {
    // 移動手把
    const border = getComputedStyle(table).borderWidth;
    const width = +(border.match(/\d+/)?.[0] || 0);

    setInterval(() => {
        if (player2.data.y >= table.offsetHeight - player1.paddle.offsetHeight - width * 2)
            player2.data.direction = -1;
        else if (player2.data.y <= 0)
            player2.data.direction = 1;

        player2.data.y += player2.data.rate * player2.data.direction;
        player2.paddle.style.top = `${ player2.data.y }px`;
    }, fps);

    //TODO 移動球
});
