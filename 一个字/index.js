/**
 * Created by Administrator on 2017/1/8.
 */
var canWidth    = 600;
var canvas      = document.getElementById('canvas');
var cxt         = canvas.getContext('2d');
var canvas2     = document.getElementById('canvas2');
var cxt2        = canvas2.getContext('2d');
var isMouseDown = false;
var lastLoc     = {
    x: 0,
    y: 0
};

var lastWidth = -1;
var arrAll    = []; //x,y,长度,是否开始或移动
canvas.width  = canvas.height = canvas2.width = canvas2.height = canWidth;

window.onload = function () {
    drawGridcxt();
    drawGridcxt2();
}

canvas.onmousedown = function (e) {
    e.preventDefault();
    var x = e.clientX, y = e.clientY;
    beginStroke({x: x, y: y})
    arrAll.push([x, y, 30, 0])
}
canvas.onmouseup   = function (e) {
    e.preventDefault();
    isMouseDown = false;

}
canvas.onmouseout  = function (e) {
    e.preventDefault();
    isMouseDown = false
}
canvas.onmousemove = function (e) {
    e.preventDefault();
    if (isMouseDown) {
        moveStroke({x: e.clientX, y: e.clientY})
    }
}

canvas.addEventListener('touchstart', function (e) {
    e.preventDefault()
    touch = e.touches[0]
    beginStroke({x: touch.pageX, y: touch.pageY})
});
canvas.addEventListener('touchmove', function (e) {
    e.preventDefault()
    if (isMouseDown) {
        touch = e.touches[0]
        moveStroke({x: touch.pageX, y: touch.pageY})
    }
});
canvas.addEventListener('touchend', function (e) {
    e.preventDefault()
    isMouseDown = false;
});

function beginStroke(point) {

    isMouseDown   = true
    lastLoc       = windowToCanvas(point.x, point.y)
    lastTimestamp = new Date().getTime();
}
function moveStroke(point) {

    var curLoc       = windowToCanvas(point.x, point.y);
    var curTimestamp = new Date().getTime();
    var s            = calDistance(curLoc, lastLoc)
    var t            = curTimestamp - lastTimestamp;

    var lineWidth = calcLineWidth(t, s);

    //draw
    cxt.beginPath();
    cxt.moveTo(lastLoc.x, lastLoc.y);
    cxt.lineTo(curLoc.x, curLoc.y);

    cxt.strokeStyle = '#000'
    cxt.lineWidth   = lineWidth
    cxt.lineCap     = "round"
    cxt.lineJoin    = "round"
    cxt.stroke();

    arrAll.push([curLoc.x, curLoc.y, lineWidth, 1])

    lastLoc       = curLoc
    lastTimestamp = curTimestamp
    lastLineWidth = lineWidth
}
function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: Math.round(x - bbox.left),
        y: Math.round(y - bbox.top)
    }
}

//绘制米字格
function drawGridcxt() {
    cxt.save()
    cxt.beginPath()
    cxt.strokeStyle = 'rgb(230,11,9)';
    cxt.lineWidth   = 6;
    cxt.moveTo(3, 3)
    cxt.lineTo(canWidth - 3, 3)
    cxt.lineTo(canWidth - 3, canWidth - 3)
    cxt.lineTo(3, canWidth - 3)
    cxt.closePath();
    cxt.stroke();

    cxt.beginPath();
    cxt.strokeStyle = '#aaa'
    cxt.lineWidth   = 1;
    cxt.moveTo(0, 0)
    cxt.lineTo(canWidth, canWidth)

    cxt.moveTo(canWidth, 0)
    cxt.lineTo(0, canWidth)

    cxt.moveTo(canWidth / 2, 0)
    cxt.lineTo(canWidth / 2, canWidth)

    cxt.moveTo(0, canWidth / 2)
    cxt.lineTo(canWidth, canWidth / 2)

    cxt.stroke()
    cxt.restore();
}
function drawGridcxt2() {
    cxt2.save()
    cxt2.beginPath()
    cxt2.strokeStyle = 'rgb(230,11,9)';
    cxt2.lineWidth   = 6;
    cxt2.moveTo(3, 3)
    cxt2.lineTo(canWidth - 3, 3)
    cxt2.lineTo(canWidth - 3, canWidth - 3)
    cxt2.lineTo(3, canWidth - 3)
    cxt2.closePath();
    cxt2.stroke();

    cxt2.beginPath();
    cxt2.strokeStyle = '#aaa'
    cxt2.lineWidth   = 1;
    cxt2.moveTo(0, 0)
    cxt2.lineTo(canWidth, canWidth)

    cxt2.moveTo(canWidth, 0)
    cxt2.lineTo(0, canWidth)

    cxt2.moveTo(canWidth / 2, 0)
    cxt2.lineTo(canWidth / 2, canWidth)

    cxt2.moveTo(0, canWidth / 2)
    cxt2.lineTo(canWidth, canWidth / 2)

    cxt2.stroke()
    cxt2.restore();
}

//计算距离
function calDistance(loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y))
}
//线条粗细
function calcLineWidth(t, s) {
    var v = s / t;
    var resultWidth;

    if (v <= 0.1) {
        resultWidth = 30;
    } else if (v >= 10) {
        resultWidth = 1
    } else {
        resultWidth = 30 - (v - 0.1) / (10 - 0.1) * (30 - 1)
    }

    if (lastWidth == -1) {
        return resultWidth;
    }


    return lastWidth * 2 / 3 + resultWidth * 1 / 3;
}

function startDraw() {
    var i           = 0;
    var time_canvas = setInterval(
        function () {
            if (i >= arrAll.length - 1) {
                clearInterval(time_canvas)
            } else {
                cxt2.save()
                cxt2.lineCap     = "round";
                cxt2.lineJoin    = "round";
                cxt2.strokeStyle = '#058';
                drawPoint(i);
                i++;
                cxt2.restore();
            }
        }, 20)


}

function drawPoint(i) {

    //开始接触


    cxt2.beginPath();
    if(arrAll[i][3] == 0){
        cxt2.moveTo(arrAll[i][0], arrAll[i][1]);
        cxt2.lineTo(arrAll[i][0], arrAll[i][1]);
    }else if(arrAll[i][3] == 1){
        cxt2.lineWidth = arrAll[i][2];
        cxt2.moveTo(arrAll[i-1][0], arrAll[i-1][1]);
        cxt2.lineTo(arrAll[i][0], arrAll[i][1]);
    }
    cxt2.stroke();
}

/*
 function startDraw() {
 console.log(arrAll);
 cxt2.save();
 cxt2.clearRect(0,0,600,600)
 drawGridcxt2();
 arrAll.forEach(function (item, index) {
 setTimeout(function () {
 drawPoint(item)
 }, index * item.time);
 });
 cxt2.restore();
 }

 function drawPoint(item){
 var lastLoc = {
 x: item.step[0].x,
 y: item.step[0].y
 };
 item.step.forEach(function (stepItem, stepindex) {
 setTimeout(function () {

 cxt2.lineWidth   = stepItem.lineWidth;
 cxt2.lineCap     = "round";
 cxt2.lineJoin    = "round";
 cxt2.strokeStyle = '#058';
 cxt2.beginPath();
 cxt2.moveTo(lastLoc.x, lastLoc.y);
 cxt2.lineTo(stepItem.step.x, stepItem.step.y);
 cxt2.stroke();

 lastLoc = stepItem.step;
 }, stepindex * stepItem.time)
 });
 }*/
