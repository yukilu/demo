// type, sx, sy, sw, sh, x, y, w, h, speed, cur, rotate
function Fishjoy(json) {
    if (!json.type)
        return;
    var keyArr = ['type', 'sx', 'sy', 'w', 'h', 'x', 'y',
    'dw', 'dh', 'speed', 'cur', 'rotate', 'scale'];
    var i;
    for (i = 0; i < keyArr.length; i++) {
        if (json[keyArr[i]] === undefined)
            this[keyArr[i]] = 0;
        else
            this[keyArr[i]] = json[keyArr[i]];
    }
}

Fishjoy.prototype.set = function (json) {
    for (var key in json)
        this[key] = json[key];
};

Fishjoy.prototype.draw = function (gd, imgName) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.rotate(this.rotate);
    if (this.scale)
        gd.scale(1, -1);
    gd.drawImage(FISHJOY[imgName], this.sx, this.sy, this.w, this.h,
        -this.dw / 2, -this.dh / 2, this.dw, this.dh);
    gd.restore();
};

Fishjoy.prototype.move = function (start, end, curDelay) {
    var that = this;
    curDelay = curDelay || 200;

    if (this.speed) {
        setInterval(function () {
            that.x += that.speedX;
            that.y += that.speedY;
        }, 30);
    }

    end = end || 0;
    if (end) {
        setInterval(function () {
            that.cur++;
            if (that.cur === end + 1)
                that.cur = start;
        }, curDelay);
    }
};

Fishjoy.prototype.isOut = function () {
    return this.x < -this.dw / 2 || this.x > WIDTH + this.dw / 2 ||
        this.y < -this.dh / 2 || this.y > HEIGHT + this.dh / 2;
};

Fishjoy.prototype.isIn = function (x, y) {
    return x > this.x && x < this.x + this.dw &&
        y > this.y && y < this.y + this.dh;
};

Fishjoy.readImg = function (arr, fnSuc, fnLoading) {
var count = 0;
var img = null;
var i = 0;
for (i = 0; i < resImg.length; i++) {
    img = new Image();
    img.src = 'img/' + resImg[i] + '.png';
    (function (index) {
        img.addEventListener('load', function () {
            count++;
            FISHJOY[resImg[index]] = this;
            fnLoading && fnLoading(count, resImg.length);
            if (count === resImg.length) {
                fnSuc && fnSuc();
            }
        }, false);
    })(i);
}
};

// refresh function fn and set delay
Fishjoy.refresh = function (fn, delay) {
    if (!fn)
        return;
    var timer = setInterval(fn, delay);
    return timer;
};

Fishjoy.rand = function (n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
};

Fishjoy.collTestByDis = function (obj1, obj2) {
    var deltaX = obj2.x - obj1.x;
    var deltaY = obj2.y - obj1.y;
    var dis = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (dis < SET_INIT.dis)
        return true;
    return false;
};

Fishjoy.collTest = function (obj1, obj2) {
    return !(obj1.x + obj1.dw < obj2.x || obj1.y + obj1.dh < obj2.y ||
        obj1.x > obj2.x + obj2.dw || obj1.y > obj2.y + obj2.dh);
};

Fishjoy.setTime = function (time) {
    setTimeout(function () {
        GAMEOVER = true;
    }, time * 1000);
};

Fishjoy.clear = function (gd) {
    gd.clearRect(0, 0, WIDTH, HEIGHT);
};

Fishjoy.drawBackground = function (gd, back) {
    gd.drawImage(back, 0, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
};

Fishjoy.drawLoadingBar = function (gd, loading) {
    var bottom = FISHJOY.bottom;
    var l = loading * LOADINGBAR.w;
    // draw bottom
    gd.drawImage(bottom, BOTTOM.x, BOTTOM.y, BOTTOM.w, BOTTOM.h,
        BOTTOM.dx, BOTTOM.dy, BOTTOM.w, BOTTOM.h);
    // draw loadingBar
    gd.drawImage(bottom, LOADINGBAR.x, LOADINGBAR.y, l, LOADINGBAR.h,
        LOADINGBAR.dx, LOADINGBAR.dy, l, LOADINGBAR.h);
};

Fishjoy.drawCountdown = function (gd, n) {
    var i;
    var digits = null;
    var temp = null;
    var numBlack = FISHJOY.number_black;
    if (!n)
        digits = [0];
    else
        digits = [];
    while (n) {
        digits.push(n % 10);
        n = Math.floor(n / 10); // score/10 is not int
    }
    for (i = 0; i < digits.length; i++) {
        temp = BLACKNUMSITE[i];
        gd.drawImage(numBlack, 0, temp.h * (BLACKNUMLEN - 1 - digits[i]), temp.w, temp.h,
            temp.dx, temp.dy, temp.w, temp.h);
    }
};

Fishjoy.drawLoadedBullet = function (gd, n) {
    var i;
    var digits = null;
    var temp1 = null;
    var temp2 = null;
    var coinText = FISHJOY.coinText;
    if (!n)
        digits = [0];
    else
        digits = [];
    while (n) {
        digits.push(n % 10);
        n = Math.floor(n / 10);
    }
    for (i = 0; i < digits.length; i++) {
        temp1 = COINTEXT[digits[i]];
        temp2 = COUNTDOWNSITE[i];
        gd.drawImage(coinText, temp1.x, temp1.y, temp1.w, temp1.h,
            temp2.dx, temp2.dy, temp2.dw, temp2.dh);
    }
};

Fishjoy.drawTotalScore = function (gd, score) {
    var i;
    var digits = null;
    var temp1 = null;
    var temp2 = null;
    var coinText = FISHJOY.coinText;
    if (!score)
        digits = [0];
    else
        digits = [];
    while (score) {
        digits.push(score % 10);
        score = Math.floor(score / 10); // score/10 is not int
    }
    for (i = 0; i < digits.length; i++) {
        temp1 = COINTEXT[digits[i]];
        temp2 = SCORESITE[i];
        gd.drawImage(coinText, temp1.x, temp1.y, temp1.w, temp1.h,
            temp2.dx, temp2.dy, temp2.dw, temp2.dh);
    }
};
