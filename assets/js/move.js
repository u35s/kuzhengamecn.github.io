/**
 * Created by tuyoo on 15/7/27.
 */
(function () {
    var moveAlong = getClass(id('move'),'moveAlong')[0];
    var arrWidth = [0,86,188,290,392,494,596,698,800];
    var navLi = id('nav').getElementsByTagName('li');
    var navNow = 0;
    for(var i=0;i<navLi.length;i++){
        if(navLi[i].getElementsByTagName('a')[0].className == 'b-active'){
            navNow = i;
        }
    }

    moveAlong.style.left = arrWidth[navNow] + 'px';
    for(var i=0;i<navLi.length;i++){
        navLi[i].index = i;
        navLi[i].focus = false;
        navLi[navNow].focus = true;
        bind(navLi[i], 'click',function () {
            for(var i=0;i<navLi.length;i++){
                navLi[i].focus = false;
            }
            this.focus = true;
            navNow = this.index;
        });
        bind(navLi[i], 'mouseover',function () {
            headMove(moveAlong,{left:arrWidth[this.index]},200,'easeIn');
        });
        bind(navLi[i], 'mouseout',function () {
            for(var j=0;j<navLi.length;j++){
                if(navLi[j].getElementsByTagName('a')[0].className == 'b-active'){
                    navNow = j;
                }
                navLi[j].focus = false;
            }
            navLi[navNow].focus = true;
            if(this.focus){
                return false;
            }else{
                headMove(moveAlong,{left:arrWidth[navNow]},200,'easeIn');
            }

        });
    }
})(window);




