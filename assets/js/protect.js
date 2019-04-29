/**
 * Created by playcrab on 16/11/9.
 */
$('.tabPanel ul li').click(function(){
    $(this).addClass('hit').siblings().removeClass('hit');
    $('.panes>div:eq('+$(this).index()+')').show().siblings().hide();
})

