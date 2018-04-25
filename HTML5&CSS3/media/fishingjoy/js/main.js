window.addEventListener('DOMContentLoaded', function () {
    Fishjoy.readImg(resImg, function () {
        var i;
        var cv = document.querySelector('canvas');
        var gd = cv.getContext('2d');
        var SET = SET_INIT;
        var fishArr = [];
        var bulletArr = [];
        var deadFishArr = [];
        var netArr = [];
        var coinArr = [];
        var scoreArr = [];
        var cannonArr = [];
        var back = new Image();
        var coinSnd = new Audio();
        var cannonSnd = new Audio();
        var buttonAdd = new ButtonAdd();
        var buttonMinus = new ButtonMinus();
        var cannon = null;
        var totalScore = 0;
        var current = 0;
        var total = Math.floor(SET.time * 1000 / SET.refreshDelay);
        var scale = 0;
        var rand = Fishjoy.rand;

        var LEFT = cv.offsetLeft;
        var TOP = cv.offsetTop;

        coinSnd.src = 'snd/coin.wav';
        cannonSnd.src = 'snd/cannon.mp3';
        back.src = 'img/game_bg.jpg';
        back.onload = function () {
            gd.drawImage(back, 0, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
        };
        for (i = 0; i < CANNONLEN; i++)
            cannonArr[i] = new Cannon(i + 1);
        cannon = cannonArr[0];

        Fishjoy.setTime(SET.time);
        Fishjoy.refresh(function () {
            var i = 0;
            var j = 0;
            var f = null;
            var sk = null;
            var df = null;
            var dsk = null;
            var net = null;
            var coin = null;
            var temp = null;
            var score = null;

            if (current !== total) {
                current++;
            }
            scale = current / total;
            Fishjoy.clear(gd);
            Fishjoy.drawBackground(gd, back);

            if (!GAMEOVER) {
                if (Math.random() < SET.fishProbability) {
                    if (Math.random() < 0.5) {
                        f = new Fish(rand(1, 5), rand(100, 500), SET.fishSpeed,
                            rand(-PI / 4, PI / 4), false);
                    } else {
                        f = new Fish(rand(1, 5), rand(100, 500), SET.fishSpeed,
                            rand(3 * PI / 4, 5 * PI / 4), true);
                    }
                    f.move(0, 3);
                    fishArr.push(f);
                }

                if (Math.random() < SET.sharkProbability) {
                    if (Math.random() < 0.5) {
                        sk = new Shark(rand(1, 2), rand(100, 500), SET.sharkSpeed,
                            rand(-PI / 4, PI / 4), false);
                    } else {
                        sk = new Shark(rand(1, 2), rand(100, 500), SET.sharkSpeed,
                            rand(3 * PI / 4, 5 * PI / 4), true);
                    }
                    sk.move(0, 7);
                    fishArr.push(sk);
                }
            }

            // collipse test and delete
            for (i = 0; i < fishArr.length; i++)
                if (fishArr[i].isOut())
                    fishArr.splice(i--, 1);
            for (i = 0; i < bulletArr.length; i++)
                if (bulletArr[i].isOut())
                    bulletArr.splice(i--, 1);
            for (i = 0; i < coinArr.length; i++)
                if (coinArr[i].isOut())
                    coinArr.splice(i--, 1);
            for (i = 0; i < fishArr.length; i++)
                for (j = 0; j < bulletArr.length; j++)
                    if (Fishjoy.collTestByDis(fishArr[i], bulletArr[j])) {
                        coinSnd.play();
                        temp = fishArr[i];
                        if (temp instanceof Fish) {
                            totalScore += temp.type;
                            df = new DeadFish(temp.type, temp.x, temp.y, temp.rotate, temp.scale);
                            df.move(4, 7);
                            deadFishArr.push(df);
                            net = new Net(temp.type, temp.x, temp.y);
                            coin = new Coin(1, temp.x, temp.y, SET.coinSpeed);
                            score = new Score(temp.type, temp.x, temp.y);
                        } else {
                            totalScore += temp.type + SET.scoreBase;
                            dsk = new DeadShark(temp.type, temp.x, temp.y, temp.rotate, temp.scale);
                            dsk.move(8, 11);
                            deadFishArr.push(dsk);
                            net = new Net(5 + temp.type, temp.x, temp.y);
                            coin = new Coin(2, temp.x, temp.y, SET.coinSpeed);
                            score = new Score(temp.type + SET.scoreBase, temp.x, temp.y);
                        }
                        netArr.push(net);
                        scoreArr.push(score);
                        coin.move(0, 9, SET.coinMoveDelay);
                        coinArr.push(coin);
                        setTimeout(function () {
                            deadFishArr.shift();
                            netArr.shift();
                            scoreArr.shift();
                        }, SET.disappearDelay);
                        fishArr.splice(i--, 1);
                        bulletArr.splice(j--, 1);
                        break;
                    }

            // draw all images
            Fishjoy.drawLoadingBar(gd, scale);
            buttonAdd.draw(gd);
            buttonMinus.draw(gd);
            Fishjoy.drawLoadedBullet(gd, cannon.loadedBullet);
            Fishjoy.drawTotalScore(gd, totalScore);
            Fishjoy.drawCountdown(gd, Math.floor((1 - scale) * SET.time));

            for (i = 0; i < bulletArr.length; i++) {
                bulletArr[i].draw(gd);
            }
            cannon.set({ sy: cannon.cur * cannon.h });
            cannon.draw(gd);

            for (i = 0; i < netArr.length; i++)
                netArr[i].draw(gd);
            for (i = 0; i < fishArr.length; i++) {
                temp = fishArr[i];
                temp.set({ sy: temp.cur * temp.h });
                temp.draw(gd);
            }

            for (i = 0; i < deadFishArr.length; i++) {
                temp = deadFishArr[i];
                temp.set({ sy: temp.cur * temp.h });
                temp.draw(gd);
            }
            for (i = 0; i < coinArr.length; i++) {
                temp = coinArr[i];
                temp.set({ sy: temp.cur * temp.h });
                temp.draw(gd);
            }
            for (i = 0; i < scoreArr.length; i++)
                scoreArr[i].draw(gd);

            if (totalScore > SCOREMAX)
                totalScore = SCOREMAX;
        }, SET.refreshDelay);

        // add click event
        cv.addEventListener('click', function (e) {
            var x = e.clientX - LEFT;
            var y = e.clientY - TOP;
            if (buttonAdd.isIn(x, y) || buttonMinus.isIn(x, y))
                return;
            var angle = Math.atan2(CENTERY - y, x - CENTERX);
            angle = PI / 2 - angle;
            cannon.set({ rotate: angle });
            if (cannon.loadedBullet) {
                cannon.fire();
                cannonSnd.play();
                var bullet = new Bullet(cannon.type, SET.bulletSpeed, angle);
                bullet.move();
                bulletArr.push(bullet);
                cannon.loadedBullet--;
            }
        }, false);

        cv.addEventListener('mousedown', function (e) {
            var x = e.clientX - LEFT;
            var y = e.clientY - TOP;
            var tempAngle = cannon.rotate;
            if (buttonAdd.isIn(x, y)) {
                buttonAdd.set({ down: true });
                if (cannon.type === CANNONLEN)
                    cannon = cannonArr[0];
                else
                    cannon = cannonArr[cannon.type];
                cannon.set({ rotate: tempAngle });
            }
            if (buttonMinus.isIn(x, y)) {
                buttonMinus.set({ down: true });
                if (cannon.type === 1)
                    cannon = cannonArr[CANNONLEN - 1];
                else
                    cannon = cannonArr[cannon.type - 2];
                cannon.set({ rotate: tempAngle });
            }
        }, false);

        cv.addEventListener('mouseup', function (e) {
            var x = e.clientX - LEFT;
            var y = e.clientY - TOP;
            if (buttonAdd.isIn(x, y))
                buttonAdd.down = false;
            if (buttonMinus.isIn(x, y))
                buttonMinus.down = false;
        }, false);
    });
}, false);
