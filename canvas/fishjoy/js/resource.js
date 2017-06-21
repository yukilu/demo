var resImg = ['bullet', 'bottom', 'fish1', 'fish2', 'fish3', 'fish4', 'fish5',
'shark1', 'shark2', 'cannon1', 'cannon2', 'cannon3', 'cannon4', 'cannon5',
'cannon6', 'cannon7', 'coin1', 'coin2', 'coinText', 'number_black', 'net'];
var FISHJOY = {};
var WIDTH = 800;
var HEIGHT = 600;
var BUTTON_SIZE = {
    addUp: { sx: 47, sy: 75, w: 36, h: 28, x: 480, y: 570 },
    addDown: { sx: 3, sy: 75, w: 36, h: 28, x: 480, y: 570 },
    minusUp: { sx: 135, sy: 75, w: 36, h: 28, x: 370, y: 570 },
    minusDown: { sx: 91, sy: 75, w: 36, h: 28, x: 370, y: 570 }
};
var FISH_SIZE = [
    null,
    { w: 55, h: 37, collR: 17 },
    { w: 78, h: 64, collR: 24 },
    { w: 72, h: 56, collR: 20 },
    { w: 77, h: 59, collR: 22 },
    { w: 107, h: 122, collR: 29 }
];
var FISHLEN = 5;
var SHARK_SIZE = [
    null,
    { w: 509, h: 270 },
    { w: 516, h: 273 }
];
var SHARKLEN = 2;
var SHARK_ZOOM = 0.6;
var CANNON_SIZE = [
    null,
    { w: 74, h: 74 },
    { w: 74, h: 76 },
    { w: 74, h: 76 },
    { w: 74, h: 83 },
    { w: 74, h: 85 },
    { w: 74, h: 90 },
    { w: 74, h: 94 }
];
var CANNONLEN = 7;
var BLACKNUMSITE = [
    { dx: 152, dy: 575, w: 20, h: 24 },
    { dx: 128, dy: 575, w: 20, h: 24 },
    { dx: 106, dy: 576, w: 20, h: 24 },
];
var BLACKNUMLEN = 10;
var BULLET_SIZE = [
    null,
    { x: 86, y: 0, w: 24, h: 26 },
    { x: 62, y: 0, w: 25, h: 29 },
    { x: 30, y: 0, w: 31, h: 35 },
    { x: 32, y: 35, w: 27, h: 31 },
    { x: 30, y: 82, w: 29, h: 33 },
    { x: 0, y: 82, w: 30, h: 34 },
    { x: 0, y: 0, w: 30, h: 44 }
];
var NET_SIZE = [
    null,
    { x: 332, y: 372, w: 88, h: 88 },
    { x: 14, y: 414, w: 108, h: 108 },
    { x: 176, y: 370, w: 128, h: 128 },
    { x: 254, y: 197, w: 148, h: 148 },
    { x: 0, y: 245, w: 154, h: 154 },
    { x: 242, y: 0, w: 180, h: 180 },
    { x: 22, y: 22, w: 200, h: 200 }
];
var BOTTOM = { x: 0, y: 0, w: 765, h: 70, dx: 17, dy: 530 };
var LOADINGBAR = { x: 1, y: 104, w: 212, h: 18, dx: 562, dy: 575 };
var SCORESITE = [
    { dx: 84, dy: 576, dw: 18, dh: 20 },
    { dx: 60, dy: 576, dw: 18, dh: 20 },
    { dx: 36, dy: 576, dw: 18, dh: 20 }
];
var COIN_SIZE = [
    null,
    { w: 60, h: 60 },
    { w: 60, h: 60 }
];
var COIN_ZOOM = 0.6;
var COINTEXT = [
    { x: 0, y: 0, w: 34, h: 49 },
    { x: 36, y: 0, w: 34, h: 49 },
    { x: 75, y: 0, w: 34, h: 49 },
    { x: 110, y: 0, w: 34, h: 49 },
    { x: 145, y: 0, w: 34, h: 49 },
    { x: 182, y: 0, w: 34, h: 49 },
    { x: 217, y: 0, w: 34, h: 49 },
    { x: 253, y: 0, w: 34, h: 49 },
    { x: 288, y: 0, w: 36, h: 49 },
    { x: 325, y: 0, w: 36, h: 49 },
    { x: 362, y: 0, w: 32, h: 49 }
];
var COINLEN = 10;
var COUNTDOWNSITE = [
    { dx: 208, dy: 580, dw: 20, dh: 20 },
    { dx: 186, dy: 580, dw: 20, dh: 20 }
];
var PI = Math.PI;
var CENTERX = 445;
var CENTERY = 575;
var SET_INIT = {
    fishProbability: 0.03,
    sharkProbability: 0.003,
    fishSpeed: 1.5,
    sharkSpeed: 1.5,
    coinSpeed: 8,
    coinMoveDelay: 40,
    bulletSpeed: 3,
    dis: 10,
    initBullet: 99,
    time: 200,
    refreshDelay: 16,
    disappearDelay: 1000,
    scoreBase: 7,
    scoreShift: 30
    };
var SCORE_ZOOM = 0.8;
var COINTARGET = { x: 100, y: HEIGHT };
var GAMEOVER = false;
var SCOREMAX = 999;
