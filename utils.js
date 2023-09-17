let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d");

function drawText(text,x,y, px){
    c.font = `${px}px serif`;
    c.fillStyle = "rgb(255,255,255)";
    c.fillText(text, x, y);
}

function drawCircle(x,y,r, color){
    c.fillStyle = color
    c.beginPath();
    c.arc(x,y,r,0,Math.PI*2)
    c.fill()
    c.closePath()
}

function drawRect(x,y,width,height){
    c.strokeStyle = "rgb(255,255,255)"
    c.lineWidth = 1;
    c.beginPath();
    c.rect(x,y,width,height)
    c.stroke()
    c.closePath()
}

export { drawText,drawCircle, drawRect}