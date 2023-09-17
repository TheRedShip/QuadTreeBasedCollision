class Vector {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    add(vec){
        return new Vector(this.x+vec.x, this.y+vec.y)
    }
    sub(vec){
        return new Vector(this.x-vec.x, this.y-vec.y)
    }
    mult(n){
        return new Vector(this.x*n, this.y*n)
    }
    divide(n){
        return new Vector(this.x/n, this.y/n)
    }
    magnitude(){
        return Math.sqrt(this.x**2 + this.y**2)
    }
    dist(vec){
        return this.sub(vec).magnitude();
    }
}

export { Vector }