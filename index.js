//音量控制
var volumn = {
    value: 0, //当前音量，表示百分比，0~100
    titleDom: document.querySelector(".title"), //显示音量数字的dom
    barDom: document.querySelector(".bar"), //显示蓝色条条的div
    audioDom: document.querySelector("audio"), //audio元素
    show: function () {
        //根据当前的音量值，重新设置dom元素
        this.titleDom.innerText = this.value;
        this.barDom.style.height = this.value + "%";
        this.audioDom.volume = this.value / 100;  //0~1
    },
    increase: function (val) { //增加指定的音量
        this.value += val;
        if (this.value > 100) { //不能超过100
            this.value = 100;
        }
        this.show();
    },
    clear: function () { //清零
        this.value = 0;
        this.show();
    }
}

//调皮的箭头
var pointer = {
    left: 0, //记录当前的marginLeft的值
    dom: document.querySelector(".pointer"), //对应的dom元素
    maxLeft: 300, //最大的left值
    startMove: function () { //开始自动左右跑
        //不断的改变pointer的left值
        var temp = this; //暂存this
        var step = 2; //left值每次增加的量
        setInterval(function () {
            // this 指向 window
            temp.left += step;
            if (temp.left >= temp.maxLeft) {
                temp.left = temp.maxLeft; //不能超过最大值
                step = -step; //反向
            }
            if (temp.left <= 0) {
                temp.left = 0; //不能小于0
                step = -step;//反向
            }
            temp.dom.style.marginLeft = temp.left + "px"; //更新dom元素的样式
        }, 16)
    },
    isCenter: function () {
        //当前的箭头在不在中间
        var centerWidth = 20;//中间宽度
        var minLeft = this.maxLeft / 2 - centerWidth / 2; //最小的left
        var maxLeft = this.maxLeft / 2 + centerWidth / 2;//最大的left
        return this.left >= minLeft && this.left <= maxLeft;
        // if (this.left >= minLeft && this.left <= maxLeft) {
        //     return true;
        // }
        // else {
        //     return false;
        // }
    }
}

volumn.show();
pointer.startMove(); //开始自动移动

window.onkeydown = function (e) {
    if (e.key === " ") {
        //按下的是空格
        if (pointer.isCenter()) {
            //箭头刚好在中间
            volumn.increase(5);
        }
        else {
            volumn.clear();
        }
    }
}