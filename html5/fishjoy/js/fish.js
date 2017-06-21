function Fish(type, y, speed, rotate, scale) {
    Fishjoy.call(this, {
        type: type,
        w: FISH_SIZE[type].w,
        h: FISH_SIZE[type].h,
        y: y,
        dw: FISH_SIZE[type].w,
        dh: FISH_SIZE[type].h,
        speed: speed,
        rotate: rotate,
        scale: scale
    });

    if (scale)
        this.x = WIDTH + this.dw / 2;
    else
        this.x = -this.dw / 2;
    this.speedX = speed * Math.cos(rotate);
    this.speedY = speed * Math.sin(rotate);
}

Fish.prototype = new Fishjoy({ type: 0 });
Fish.prototype.constructor = Fish;
Fish.prototype.draw = function (gd) {
    Fishjoy.prototype.draw.call(this, gd, 'fish' + this.type);
};

function Shark(type, y, speed, rotate, scale) {
    Fishjoy.call(this, {
        type: type,
        w: SHARK_SIZE[type].w,
        h: SHARK_SIZE[type].h,
        y: y,
        dw: SHARK_SIZE[type].w * SHARK_ZOOM,
        dh: SHARK_SIZE[type].h * SHARK_ZOOM,
        speed: speed,
        rotate: rotate,
        scale: scale
    });

    if (scale)
        this.x = WIDTH + this.dw / 2;
    else
        this.x = -this.dw / 2;
    this.speedX = speed * Math.cos(rotate);
    this.speedY = speed * Math.sin(rotate);
}

Shark.prototype = new Fishjoy({ type: 0 });
Shark.prototype.constructor = Shark;
Shark.prototype.draw = function (gd) {
    Fishjoy.prototype.draw.call(this, gd, 'shark' + this.type);
};

function Cannon(type) {
    Fishjoy.call(this, {
        type: type,
        w: CANNON_SIZE[type].w,
        h: CANNON_SIZE[type].h,
        x: CENTERX,
        y: CENTERY,
        dw: CANNON_SIZE[type].w,
        dh: CANNON_SIZE[type].h
    });

    this.loadedBullet = SET_INIT.initBullet;
}

Cannon.prototype = new Fishjoy({ type: 0 });
Cannon.prototype.constructor = Cannon;
Cannon.prototype.fire = function () {
    clearInterval(this.timer);
    this.cur = 0;
    var that = this;
    this.timer = setInterval(function () {
        that.cur++;
        if (that.cur === 5) {
            clearInterval(that.timer);
            that.cur = 0;
        }
    }, 100);
};
Cannon.prototype.draw = function (gd) {
    Fishjoy.prototype.draw.call(this, gd, 'cannon' + this.type);
};

function Bullet(type, speed, rotate) {
    Fishjoy.call(this, {
        type: type,
        sx: BULLET_SIZE[type].x,
        sy: BULLET_SIZE[type].y,
        w: BULLET_SIZE[type].w,
        h: BULLET_SIZE[type].h,
        x: CENTERX,
        y: CENTERY,
        dw: BULLET_SIZE[type].w,
        dh: BULLET_SIZE[type].h,
        speed: speed,
        rotate: rotate
    });

    var speedAngle = PI / 2 - rotate;
    this.speedX = speed * Math.cos(speedAngle);
    this.speedY = -speed * Math.sin(speedAngle);
}

Bullet.prototype = new Fishjoy({ type: 0 });
Bullet.prototype.constructor = Bullet;
Bullet.prototype.draw = function (gd) {
    Fishjoy.prototype.draw.call(this, gd, 'bullet');
};

function DeadFish(type, x, y, rotate, scale) {
    Fishjoy.call(this, {
        type: type,
        sx: 0,
        sy: 4 * FISH_SIZE[type].h,
        w: FISH_SIZE[type].w,
        h: FISH_SIZE[type].h,
        x: x,
        y: y,
        dw: FISH_SIZE[type].w,
        dh: FISH_SIZE[type].h,
        cur: 4,
        rotate: rotate,
        scale: scale
    });
}

DeadFish.prototype = new Fishjoy({ type: 0 });
DeadFish.prototype.constructor = DeadFish;
DeadFish.prototype.draw = function (gd) {
    Fishjoy.prototype.draw.call(this, gd, 'fish' + this.type);
};

function DeadShark(type, x, y, rotate, scale) {
    Fishjoy.call(this, {
        type: type,
        sx: 0,
        sy: 8 * SHARK_SIZE[type].h,
        w: SHARK_SIZE[type].w,
        h: SHARK_SIZE[type].h,
        x: x,
        y: y,
        dw: SHARK_SIZE[type].w * SHARK_ZOOM,
        dh: SHARK_SIZE[type].h * SHARK_ZOOM,
        cur: 8,
        rotate: rotate,
        scale: scale
    });
}

DeadShark.prototype = new Fishjoy({ type: 0 });
DeadShark.prototype.constructor = DeadShark;
DeadShark.prototype.draw = function (gd) {
    Fishjoy.prototype.draw.call(this, gd, 'shark' + this.type);
};

function Net(type, x, y) {
    Fishjoy.call(this, {
        type: type,
        sx: NET_SIZE[type].x,
        sy: NET_SIZE[type].y,
        w: NET_SIZE[type].w,
        h: NET_SIZE[type].h,
        x: x,
        y: y,
        dw: NET_SIZE[type].w,
        dh: NET_SIZE[type].h
    });
}

Net.prototype = new Fishjoy({ type: 0 });
Net.prototype.constructor = Net;
Net.prototype.draw = function (gd) {
    Fishjoy.prototype.draw.call(this, gd, 'net');
};

function Button() {
    this.w = this.dw = BUTTON_SIZE.addUp.w;
    this.h = this.dh = BUTTON_SIZE.addUp.h;
}

Button.prototype = new Fishjoy({ type: 0 });
Button.prototype.constructor = Button;

function ButtonAdd() {
    this.sx = BUTTON_SIZE.addUp.sx;
    this.sy = BUTTON_SIZE.addUp.sy;
    this.x = BUTTON_SIZE.addUp.x;
    this.y = BUTTON_SIZE.addUp.y;
    this.down = false;
}

ButtonAdd.prototype = new Button();
ButtonAdd.prototype.constructor = ButtonAdd;
ButtonAdd.prototype.draw = function (gd) {
    var state = 'add';
    if (this.down)
        state += 'Down';
    else
        state += 'Up';
    gd.drawImage(FISHJOY.bottom, BUTTON_SIZE[state].sx, BUTTON_SIZE[state].sy,
        this.w, this.h, this.x, this.y, this.dw, this.dh);
};

function ButtonMinus() {
    this.sx = BUTTON_SIZE.minusUp.sx;
    this.sy = BUTTON_SIZE.minusUp.sy;
    this.x = BUTTON_SIZE.minusUp.x;
    this.y = BUTTON_SIZE.minusUp.y;
    this.down = false;
}

ButtonMinus.prototype = new Button();
ButtonMinus.prototype.constructor = ButtonMinus;
ButtonMinus.prototype.draw = function (gd) {
    var state = 'minus';
    if (this.down)
        state += 'Down';
    else
        state += 'Up';
    gd.drawImage(FISHJOY.bottom, BUTTON_SIZE[state].sx, BUTTON_SIZE[state].sy,
         this.w, this.h, this.x, this.y, this.dw, this.dh);
};

function Coin(type, x, y, speed) {
    Fishjoy.call(this, {
        type: type,
        sx: 0,
        sy: 0,
        w: COIN_SIZE[type].w,
        h: COIN_SIZE[type].h,
        x: x,
        y: y,
        dw: COIN_SIZE[type].w * COIN_ZOOM,
        dh: COIN_SIZE[type].h * COIN_ZOOM,
        speed: speed,
    });

    var rotate = Math.atan2(COINTARGET.y - y, x - COINTARGET.x);
    this.speedX = -speed * Math.cos(rotate);
    this.speedY = speed * Math.sin(rotate);
}

Coin.prototype = new Fishjoy({ type: 0 });
Coin.prototype.constructor = Coin;
Coin.prototype.draw = function (gd) {
    Fishjoy.prototype.draw.call(this, gd, 'coin' + this.type);
};

function Score(score, x, y) {
    this.x = x;
    this.y = y;
    this.score = score;
}

Score.prototype = new Fishjoy({ type: 0 });
Score.prototype.constructor = Score;
Score.prototype.draw = function (gd) {
    var coinText = FISHJOY.coinText;
    var multiply = COINTEXT[10];
    var num = COINTEXT[this.score];
    gd.drawImage(coinText, multiply.x, multiply.y, multiply.w, multiply.h,
        this.x + SET_INIT.scoreShift, this.y,
        multiply.w * SCORE_ZOOM, multiply.h * SCORE_ZOOM);
    gd.drawImage(coinText, num.x, num.y, num.w, num.h,
        this.x + SET_INIT.scoreShift + multiply.w * SCORE_ZOOM, this.y,
        num.w * SCORE_ZOOM, num.h * SCORE_ZOOM);
};
