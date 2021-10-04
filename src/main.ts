const table = document.getElementById("table") as HTMLDivElement;
const net = document.getElementById("net") as HTMLDivElement;
const ball = document.getElementById("ball") as HTMLDivElement;


const player1 = {
    paddle: document.getElementById("paddle-01") as HTMLDivElement,
    score: document.getElementById("score-01") as HTMLDivElement,
};

const player2 = {
    paddle: document.getElementById("paddle-02") as HTMLDivElement,
    score: document.getElementById("score-02") as HTMLDivElement,
};

//TODO 研究此 3 個坐標系參數的差異
// console.log(player2.paddle.offsetTop, player2.paddle.offsetLeft);
// console.log(player2.paddle.clientTop, player2.paddle.clientTop);
// console.log(player2.paddle.scrollTop, player2.paddle.scrollLeft);

table.addEventListener("mousemove", (event: MouseEvent) => {
    //TODO 研究此 6 個坐標系參數的差異
    // console.log(event.offsetX, event.offsetY)
    // console.log(event.clientX, event.clientY)
    // console.log(event.movementX, event.movementY)
    // console.log(event.screenX, event.screenY)
    // console.log(event.pageX, event.pageY)
    // console.log(event.x, event.y)

    //TODO 處理 table.style.border: 去單位 >> 字串轉數字 >> * 2
    const border = 20;
    const half = player1.paddle.offsetHeight / 2;

    let y = event.offsetY;
    if (y < half) {
        y = half;
    }
    else if (y >= table.offsetHeight - half - border) {
        y = table.offsetHeight - half - border;
    }
    //TODO clamp()

    player1.paddle.style.top = `${ y - player1.paddle.offsetHeight / 2 }px`;
});

function clamp(value: number, max: number, min: number) {
    //TODO 當 value 大於 max，回傳 max；當小於 min，回傳 min；否則依舊是 value
    return value;
}

function setScore(element: HTMLDivElement, scroe: number | "+" | "-") {
    //TODO 當 score 是 number 型別: 直接賦值；若為 +，表示 +1；若為 -，表示 -1
}

//TODO 讓電腦可以自動上下移動 setInterval + player1.paddle.style.top

//TODO 思考 AI 的移動方式，並寫於 .md 文件中
