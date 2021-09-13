console.log("hello world")

const div: HTMLDivElement;
div.addEventListener("mousemove", (event: MouseEvent) => {
    console.log(event.movementX, event.movementY);
});
