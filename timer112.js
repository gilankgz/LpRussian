var javascript_countdown=function(){var time_left=10;var keep_counting=1;var no_time_left_message='few seconds';function countdown(){if(time_left<2){keep_counting=0;}
time_left=time_left- 1;}
function add_leading_zero(n){if(n.toString().length<2){return'0'+ n;}else{return n;}}
function format_output(){var hours,minutes,seconds;seconds=time_left%60;minutes=Math.floor(time_left/60)%60;hours=Math.floor(time_left/3600);seconds=add_leading_zero(seconds);minutes=add_leading_zero(minutes);hours=add_leading_zero(hours);return minutes+' minutes and '+ seconds+' seconds';}
function show_time_left(){document.getElementById('javascript_countdown_time').innerHTML='<span>'+ format_output()+'</span>';}
function no_time_left(){document.getElementById('javascript_countdown_time').innerHTML=no_time_left_message;}
return{count:function(){countdown();show_time_left();},timer:function(){javascript_countdown.count();if(keep_counting){setTimeout("javascript_countdown.timer();",1000);}else{no_time_left();}},init:function(n){time_left=n;javascript_countdown.timer();}};}();javascript_countdown.init(290);