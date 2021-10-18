const table = document.getElementById("table") as HTMLDivElement;
const net = document.getElementById("net") as HTMLDivElement;
const ball = document.getElementById("ball") as HTMLDivElement;

const player1 = {
    paddle: document.getElementById("paddle1") as HTMLDivElement,
    score: document.getElementById("score1") as HTMLDivElement,
};

const player2 = {
    paddle: document.getElementById("paddle2") as HTMLDivElement,
    score: document.getElementById("score2") as HTMLDivElement, 
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





table.addEventListener("mousemove", (event: MouseEvent) => {
    //todo 處理 table. style.border, 去單位 >> 字串轉數字 * 2
    table.style.border = "13px solid lightslategray";
    const border = table.style.border;

    let result1 = "" as string;
    for (let i = 0; i < border.length; i++) {
        if (border[i].match(/[0-9.]/)) {
            result1 += border[i];
        }
    }
    const strToNum = +result1;
    const half = player1.paddle.offsetHeight / 2

    let y = event.offsetY;
    if (y < half) {
        y = half ;
    }
    else if (y >= table.offsetHeight - half - strToNum * 2) {
        y = table.offsetHeight - half - strToNum * 2;
    }
    // const y = event.offsetY - player1.paddle.offsetHeight / 2;
    player1.paddle.style.top = `${ y - half }px`;
})  


var y = 0;
window.onload = function() {
    setInterval(function() 
    {   
        player2.paddle.style.top = y;
        if (y < +(table.offsetHeight)) {
            y++;
        }
        else if (y > +(table.offsetHeight) - player2.paddle.offsetHeight) {
            y--;
        }
    }, 10);
}



