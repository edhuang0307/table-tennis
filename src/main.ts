const table = document.getElementById("table") as HTMLDivElement;
const net = document.getElementById("net") as HTMLDivElement;
const ball = document.getElementById("ball") as HTMLDivElement;


const player01 = {
    paddle: document.getElementById("paddle-01") as HTMLDivElement,
    score: document.getElementById("score-01") as HTMLDivElement,
};

const player02 = {
    paddle: document.getElementById("paddle-02") as HTMLDivElement,
    score: document.getElementById("score-02") as HTMLDivElement,
};

table.addEventListener("mousemove", (event: MouseEvent) => {
    event.movementX, event.movementY
    console.log(event.movementX, event.movementY)
})