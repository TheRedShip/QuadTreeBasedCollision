import { Simulation } from "./simulation.js";

let canvas = document.querySelector("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext("2d");

let simulation = new Simulation();

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0, 0.7)"
    c.fillRect(0,0, window.innerWidth, window.innerHeight)

    simulation.update();
}

animate()
