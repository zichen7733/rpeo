function animation(obj, targent, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //步长要放在定时器内

        //因为有小数,所以最后移动的位置会有偏差,需要取整,往上取整Math.ceil
        // var step = Math.ceil((targent - obj.offsetLeft) / 10);
        var step = (targent - obj.offsetLeft) / 10;

        step = step > 0 ? step = Math.ceil(step) : Math.floor(step);

        if (obj.offsetLeft == targent) {
            //停止动画
            clearInterval(obj.timer);
            //判断是否传入回调函数
            if (callback) {
                //调用回调函数
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px'; //offsetLeft只读特性,5是移动速度可改
    }, 15)

}