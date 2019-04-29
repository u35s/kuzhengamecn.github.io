/**
 * Created by tuyoo on 15/6/18.
 */

/* index.html */
(function (a) {
    var picL = id('picList');
    var imgL = id('imgList');
    var aLi = getTag(imgL,'li');
    var iNow = 0;
    var points = id('points');
    var aLi1 = getTag(points,'li');

    picList(aLi,picL,imgL);
    function picList(aLi,picL,imgL){
        for(var i=0;i<aLi.length;i++){
            aLi[i].style.width = picL.offsetWidth + 'px';
        }
        var w = aLi[0].offsetWidth;
        imgL.style.width = aLi.length*w + 'px';
    }


    imgL.timer = setInterval(function () {
        iNow++;
        if(iNow > aLi.length-1){
            iNow = 0;
        }
        next(iNow,aLi,imgL,aLi1);
    },8000);
    for(var i=0;i<aLi1.length;i++){
        aLi1[i].index = i;
        bind(aLi1[i],'mouseover', function () {
            clearInterval(imgL.timer);
        });
        bind(aLi1[i],'mouseout', function () {
            imgL.timer = setInterval(function () {
                iNow++;
                if(iNow > aLi.length-1){
                    iNow = 0;
                }
                next(iNow,aLi,imgL,aLi1);
            },8000);
        });
        bind(aLi1[i],'click', function () {
            iNow = this.index;
            startMove(imgL,{left:-this.index*aLi[0].offsetWidth});
            for(var i=0;i<aLi1.length;i++){
                aLi1[i].className = '';
            }
            aLi1[this.index].className = 'active';
        });
    }

    var gList = id('gList');
    var gLi = getTag(gList,'li');
    var gLeft = getClass(document,'turnLeft')[0];
    var gRight = getClass(document,'turnRight')[0];
    var iNow1 = 0;
    gList.innerHTML += gList.innerHTML;
    gList.style.width = gLi.length*gLi[0].offsetWidth + 'px';
    bind(gLeft,'click', function () {
        iNow1--;
        if(iNow1 < 0){
            iNow1 = 0;
            return false;
        }
        next(iNow1,gLi,gList);
    });
    bind(gRight,'click', function () {
        iNow1 ++;
        if(iNow1 > gLi.length- 4){
            iNow1 = gLi.length - 4;
            return false;
        }
        next(iNow1,gLi,gList);
    });
     document.getElementById("messageBox").onmouseover=function(){
        console.log(890809)
        document.getElementById('newsBox').style.display = 'block';
    };
    document.getElementById("messageBox").onmouseout=function(){
        document.getElementById('newsBox').style.display = 'none';
    };
var gListed = id('gListed');
    var gLis = getTag(gListed,'li');
    var gLefted = getClass(document,'turnLefted')[0];
    var gRighted = getClass(document,'turnRighted')[0];


    var jNow1 = 0;
    gListed.innerHTML += gListed.innerHTML;
    gListed.style.width = gLis.length*gLis[0].offsetWidth + 'px';
    bind(gLefted,'click', function () {
        jNow1--;
        if(jNow1 < 0){
            jNow1 = 0;
            return false;
        }
        next(jNow1,gLis,gListed);
    });
    bind(gRighted,'click', function () {
        jNow1 ++;
        if(jNow1 > gLis.length- 4){
            jNow1 = gLis.length - 4;
            return false;
        }
        next(jNow1,gLis,gListed);
    });
})(window);



// 
var closexf=document.getElementById("closexf");
var xfwindows=document.getElementById("xfwindows");
var hide=document.getElementById("hide");

    closexf.onclick=function(){
        xfwindows.style.display="none";
        hide.style.display="block";
    }
    hide.onclick=function(){
        xfwindows.style.display="block";
        hide.style.display="none";

    }
