window.addEventListener('load', function() {
    //1.获取元素
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var focus = document.querySelector('.focus');

    var focusWidth = focus.offsetWidth;
    // console.log(btm);
    //2.鼠标经过事件
    focus.addEventListener('mouseenter', function() {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer)
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function() {
            right.click();
        }, 4000)

    })

    var imgs = document.querySelector('.content').querySelectorAll('li');
    var btm = focus.querySelector('.bottom');
    var content = focus.querySelector('.content');
    for (var i = 0; i < imgs.length; i++) {
        //3.创建一个小li
        var li = document.createElement('li');
        //记录小圆圈的索引号
        li.setAttribute('index', i);
        //.把li插入ul
        btm.style.width = imgs.length * 12.5 + 'px';
        btm.appendChild(li);

        //5.小圆圈排他思想
        li.addEventListener('click', function() {

            for (var i = 0; i < btm.children.length; i++) {
                btm.children[i].className = '';
            }
            this.className = 'current';
            //6.当我们点击某个小圆圈就拿到他的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个小圆圈,就要把该圆圈的索引号给num
            num = index;
            //当我们点击了某个小圆圈,就要把该圆圈的索引号给circle;
            circle = index;
            console.log(index);
            //7.content的移动距离就是小圆圈索引号*图片的宽度

            animation(content, -index * focusWidth);
        })
    }
    //第一个圆点设置为橙色
    btm.children[0].className = 'current';
    //克隆第一张图片放在ul后面

    var first = content.children[0].cloneNode(true);
    content.appendChild(first);




    //8.点击右侧按钮,图片滚动一张
    var num = 0;
    var circle = 0;
    var flag = true; //节流阀
    right.addEventListener('click', function() {

        if (flag) {
            flag = false;
            //如果走到了最后一张复制的图片,要让left = 0;
            if (num == content.children.length - 1) {
                content.style.left = 0;
                num = 0;
            }
            num++;
            animation(content, -num * focusWidth, function() {
                flag = true
            })
            circle++;
            //清除其他小圆圈的类名;
            if (circle == 6) {
                circle = 0;

            }
            circleChange();

        }
    })

    left.addEventListener('click', function() {

        if (flag) {
            flag = false;
            //如果走到了第一张复制的图片,要让left = 0;
            if (num == 0) {
                num = content.children.length - 1;
                content.style.left = -num * focusWidth + 'px';
                circleChange();
            }
            num--;
            animation(content, -num * focusWidth, function() {
                flag = true;
            })
            circle--;
            //清除其他小圆圈的类名;
            if (circle < 0) {
                circle = btm.children.length - 1;
            }
            circleChange();
        }
    })

    //封装清除小圆圈和显示当前小圆圈的函数
    function circleChange() {
        for (var i = 0; i < btm.children.length; i++) {
            btm.children[i].className = '';
        }
        btm.children[circle].className = 'current';
    }

    //自动播放, right.click(); 手动点击事件
    var timer = setInterval(function() {
        right.click();
    }, 4000)
})