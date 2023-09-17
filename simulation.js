import { drawText } from "./utils.js";
import { Ball } from "./ball.js";
import { ccCollision } from "./collisionResolver.js";
import { Vector } from "./vector.js";
import { QuadTree, Rectangle } from "./quadtree.js";

let canvas = document.querySelector("canvas")

class Simulation {
    constructor(){
        this.particles = [];
        this.checkPerFrame = 0;
        this.ballNum = 0;
        this.mousepos = new Vector(0,0);
        this.mouseClick = false;

        let handleMousemove = (event) => {
            this.mousepos.x = event.clientX;
            this.mousepos.y = event.clientY;
        };
        document.addEventListener('mousemove', handleMousemove);

        let handleMouseDown = (event) => {
            this.mouseClick = true
        };
        document.addEventListener("mousedown", handleMouseDown);

        let handleMouseUp = (event) => {
            this.mouseClick = false
        };
        document.addEventListener("mouseup", handleMouseUp);
        
    }

    resolveCollision(particle, secondParticle){
        this.checkPerFrame += 1;
        if(particle.pos.dist(secondParticle.pos) < particle.r + secondParticle.r){
            ccCollision(particle,secondParticle)
        }
    }
    checkBallCollision(qtree){
        for(let particle of this.particles){
            let particleRegion = new Rectangle(particle.pos.x-particle.r*2, particle.pos.y-particle.r*2,particle.r*4,particle.r*4)
            let otherParticles = qtree.query(particleRegion)
            for(let otherParticle of otherParticles){
                if(otherParticle != particle){
                    let otherParticleRegion = new Rectangle(otherParticle.pos.x-otherParticle.r, otherParticle.pos.y-otherParticle.r,otherParticle.r*5,otherParticle.r*5)
                    
                    if(particleRegion.intersect(otherParticleRegion))
                        this.resolveCollision(particle,otherParticle)
                }
            }
        }
    }
    update(){
        this.checkPerFrame = 0;
        if(this.mouseClick){
            this.particles.push(new Ball(this.mousepos.x + Math.random()*2,this.mousepos.y+Math.random()*2))
            this.ballNum++;
        }

        let qtree = new QuadTree(0,0, canvas.width,canvas.height)
        this.particles.forEach(particle => {
            particle.update()
            qtree.insert(particle);
        })

        for(let i = 0; i < 4; i++)
            this.checkBallCollision(qtree);
        
        qtree.show();
        drawText("check : " + String(this.checkPerFrame),100,100,50);
        drawText("ballNum : " +String(this.ballNum),100,150,50);
    }
}

export { Simulation }