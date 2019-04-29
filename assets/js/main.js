function setCookie(name,value)
{
	var Days = 1;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
function id(obj) {
    return document.getElementById(obj);
}

function getClass(op,obj){
    return op.getElementsByClassName(obj);
}

function getTag(op,obj){
    return op.getElementsByTagName(obj);
}

function bind(obj, ev, fn) {
	fn = fn || function(){};
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}

function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

function windowView(){
    return {
        w:document.body.offsetWidth,
        h:document.body.offsetHeight
    }
}

function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function loadImg(arr){
	var oImg = new Image();
	var i = 0;
	oImg.src = arr[i];
	recurse(oImg,i,arr);

}
function recurse(oImg,i,arr){
	oImg.onload = function () {
		i++;
		if(i = arr.length){
			return false;
		}
		oImg.src = arr[i];
		recurse(oImg,i,arr);
	};
}
function startMove(obj, json, fn) {
    clearInterval(obj.iTimer);
    var iCur = 0;
    var iSpeed = 0;

    obj.iTimer = setInterval(function() {

        var iBtn = true;

        for ( var attr in json ) {

            var iTarget = json[attr];

            if (attr == 'opacity') {
                iCur = Math.round(getStyle( obj, 'opacity' ) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }

            iSpeed = ( iTarget - iCur ) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != iTarget) {
                iBtn = false;
                if (attr == 'opacity') {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                    obj.style.filter = "alpha(opacity='+ (iCur + iSpeed) +')";
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }

        }

        if (iBtn) {
            clearInterval(obj.iTimer);
            fn && fn.call(obj);
        }

    }, 30);
}

function next(iNow,aLi,imgL,aLi1){
    startMove(imgL,{left:-iNow*aLi[0].offsetWidth});
    if(!arguments[3]){
        return false;
    }
    for(var i=0;i<aLi1.length;i++){
        aLi1[i].className = '';
    }
    aLi1[iNow].className = 'active';
}

function moveRight(ul,left,right){
    ul.innerHTML += ul.innerHTML;
    var aLi = ul.getElementsByTagName('li');
    var num = 0;
    ul.style.width = aLi[0].offsetWidth*aLi.length + 'px';
    ul.style.left = -(aLi.length/2 )*aLi[0].offsetWidth + 'px';
    num = aLi.length/2;
    bind(left,'click', function () {
        num --;
        if(num == 1){
            ul.style.left = -(aLi.length/2 + 2)*aLi[0].offsetWidth + 'px';
            num = aLi.length/2 + 1;
        }
        startMove(ul,{left:-num*aLi[0].offsetWidth});
    });
    bind(right,'click', function () {
        num ++;
        if(num == aLi.length - 1){
            ul.style.left = -(aLi.length/2 - 2)*aLi[0].offsetWidth + 'px';
            num = aLi.length/2 - 1;
        }
        startMove(ul,{left:-num*aLi[0].offsetWidth});
    });
}

function moveTop(fn){
    var timer = null;
    var iCur = 0;
    var iSpeed = 0;
    clearInterval(timer);
    timer = setInterval(function () {
        var iBtn = true;
        var iTarget = 0;
        iCur = document.documentElement.scrollTop || document.body.scrollTop;
        iSpeed = ( iTarget - iCur ) / 8;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

        if (iCur != iTarget) {
            iBtn = false;
            document.documentElement.scrollTop=document.body.scrollTop=iCur+iSpeed;
        }

        if (iBtn) {
            clearInterval(obj.iTimer);
            fn && fn.call(obj);
        }
    },40);
}

function headMove(obj,json,times,fx,fn){
    var iCur = {};

    for(var attr in json){
        iCur[attr] = 0;
        if(attr == 'opacity'){
            iCur[attr] = Math.round(getStyle(obj,attr)*100);
        }else{
            iCur[attr] = parseInt(getStyle(obj,attr));
        }
    }

    var startTime = now();

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var changeTime = now();

        var t = times - Math.max(0,startTime - changeTime + times);
        for(var attr in json){

            var value = Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);
            if(attr == 'opacity'){
                obj.style.opacity = value/100;
                obj.style.filter = 'alpha(opacity='+value+')';
            }else{
                obj.style[attr] = value + 'px';
            }

        }
        if(t == times){
            clearInterval(obj.timer);
            if(fn){
                fn.call(obj);
            }
        }

    },13);

}
function now(){
    return (new Date()).getTime();
}
var Tween = {
    linear: function (t, b, c, d){  //����
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //��������
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //��������
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //���ټ�������
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //�Ӽ�������
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //����������
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //�Ӽ��ټ���������
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //����˥�����ߣ��������룩
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};

function navMove(i){
    var moveAlong = getClass(id('move'),'moveAlong')[0];
    var arrWidth = [0,86,188,290,392,494];
    moveAlong.style.left = arrWidth[i] + 'px';
}

document.createElement('header');
document.createElement('footer');
function setCookie(name,value)
{
	var Days = 1;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
