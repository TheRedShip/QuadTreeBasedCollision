import { drawRect } from "./utils.js"


class Rectangle{
    constructor(x,y,width,height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    contains(object) {
        return (object.pos.x >= this.x - this.width &&
          object.pos.x <= this.x + this.width &&
          object.pos.y >= this.y - this.height &&
          object.pos.y <= this.y + this.height);
    }
    
    intersect(region) {
        return !(region.x - region.width > this.x + this.width ||
        region.x + region.width < this.x - this.width ||
        region.y - region.height > this.y + this.height ||
        region.y + region.height < this.y - this.height);
    }
    draw(){
        drawRect(this.x,this.y, this.width, this.height);
    }
}

// let globalcheck = 0;

class QuadTree{
    constructor(x,y,width,height){
        this.objects = [];
        
        this.boundary = new Rectangle(x,y,width,height)
        this.capacity = 1;
        this.isDivided = false;
        // this.check = 0;
    }
    insert(object) {
        if(!this.boundary.contains(object))
            return false;
        if(this.objects.length < this.capacity){
            this.objects.push(object);
            return true;
        }else{
            if(!this.isDivided){
                this.isDivided = true;
                this.northwest = new QuadTree(this.boundary.x,this.boundary.y,this.boundary.width/2,this.boundary.height/2)
                this.northeast = new QuadTree(this.boundary.x+this.boundary.width/2,this.boundary.y,this.boundary.width/2,this.boundary.height/2)
                this.southwest = new QuadTree(this.boundary.x,this.boundary.y+this.boundary.height/2,this.boundary.width/2,this.boundary.height/2)
                this.southeast = new QuadTree(this.boundary.x+this.boundary.width/2,this.boundary.y+this.boundary.height/2,this.boundary.width/2,this.boundary.height/2)
            }
            if(this.northwest.insert(object))
                return true;
            if(this.northeast.insert(object))
                return true;
            if(this.southwest.insert(object))
                return true;
            if(this.southeast.insert(object))
                return true;
        }
    }
    query(region, found){
        if(!found){
            // globalcheck = 0;
            found = [];
        }
        if(!this.boundary.intersect(region))
            return;
        for(let p of this.objects){
            // globalcheck++;
            if(region.contains(p))
                found.push(p)
        }
        if(this.isDivided){
            this.northwest.query(region, found)
            this.northeast.query(region, found)
            this.southwest.query(region, found)
            this.southeast.query(region, found)
        }
        // this.check = globalcheck;
        return found;
    }
    show(){
        this.boundary.draw();
        if(this.isDivided){
            this.northwest.show()
            this.northeast.show()
            this.southwest.show()
            this.southeast.show()
        }
    }
}

export { QuadTree, Rectangle }