import { Vector } from "./vector.js"
import { drawCircle } from "./utils.js"


let canvas = document.querySelector("canvas")

class Ball {
    constructor(x, y) {
        this.pos = new Vector(x,y);
        this.vel = new Vector(0,0);
        this.gravity = new Vector(0,0.1);

        this.r = 15;
        this.friction = 0.7;
        this.m = 1;
    }
    updateVelocity(){
        this.vel = this.vel.add(this.gravity);
        this.pos = this.pos.add(this.vel)
    }
    checkWallCollision(){
        if(this.pos.y > canvas.height - this.r){
            this.pos.y = canvas.height - this.r;
            this.vel.y *= -1 * this.friction;
        }
        else if(this.pos.y < this.r){
            this.pos.y = this.r;
            this.vel.y *= -1 * this.friction;
        }
        if(this.pos.x > canvas.width - this.r){
            this.pos.x = canvas.width - this.r;
            this.vel.x *= -1 * this.friction;
        }
        else if(this.pos.x < this.r){
            this.pos.x = this.r;
            this.vel.x *= -1 * this.friction;
        }
    }
    update() {
        this.updateVelocity();
        
        this.checkWallCollision();

        this.draw();
    }
    draw() {
        drawCircle(this.pos.x,this.pos.y,this.r, "rgb(255,255,255)")
    }
}


export { Ball }