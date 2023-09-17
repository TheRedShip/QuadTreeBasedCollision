function ccCollision(obj1, obj2) {
    let dist = { x: obj1.pos.x - obj2.pos.x, y: obj1.pos.y - obj2.pos.y }
    let distMag = Math.sqrt(dist.x ** 2 + dist.y ** 2)
    if (distMag < obj1.r + obj2.r) {
        ccPenRes(obj1, obj2,dist,distMag)

        let vCollision = { x: obj2.pos.x - obj1.pos.x, y: obj2.pos.y - obj1.pos.y };
        let distance = Math.sqrt((obj2.pos.x - obj1.pos.x) ** 2 + (obj2.pos.y - obj1.pos.y) ** 2);
        let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance }; //dir normal

        let vRelativeVelocity = { x: obj1.vel.x - obj2.vel.x, y: obj1.vel.y - obj2.vel.y };
        let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

        speed *= 0.95
        if (speed < 0) {

        } else {
            let impulse = 2 * speed / (obj1.m + obj2.m);

            obj1.vel.x -= (impulse * obj2.m * vCollisionNorm.x)
            obj1.vel.y -= (impulse * obj2.m * vCollisionNorm.y)
            
            obj2.vel.x += (impulse * obj1.m * vCollisionNorm.x)
            obj2.vel.y += (impulse * obj1.m * vCollisionNorm.y)
        }
    }
}
function ccPenRes(obj1, obj2,dist,distMag) {
    let pen_depth = obj1.r + obj2.r - distMag

    let pen_res;
    if (distMag == 0) {
        pen_res = { x: 0, y: 0 }
    } else {
        let DirectionNormalized = { x: dist.x / distMag, y: dist.y / distMag }
        pen_res = { x: DirectionNormalized.x * (pen_depth / 2), y: DirectionNormalized.y * (pen_depth / 2) }
    }

    if (!obj1.static) {
        obj1.pos.x += pen_res.x
        obj1.pos.y += pen_res.y
    }
    if (!obj2.static) {
        obj2.pos.x -= pen_res.x
        obj2.pos.y -= pen_res.y
    }
}

export {ccCollision}