
var setTimer = null;
	var chazhi = 0;
	//差值计算
	//例子(模拟)
	chazhi = 135 * 86400000;
 
	//真实时间(注意月份需减掉1，否则时间会计算错误)
	//chazhi = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数
	//chazhi = (new Date(2018,8-1,6,6,6,6)) - (new Date());
	
	//执行函数部分
	countFunc(chazhi);
	setTimer = setInterval(function() {
		chazhi = chazhi - 1000;
		countFunc(chazhi);
	}, 1000);
	function countFunc(leftTime) {
		if(leftTime >= 0) {
			var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
			var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
			var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 
			var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 
			days = checkTime(days);
			hours = checkTime(hours);
			minutes = checkTime(minutes);
			seconds = checkTime(seconds);
		
			$(".hour").html(hours);
			$(".minute").html(minutes);
			$(".second").html(seconds);
		} else {
			clearInterval(setTimer);
			
			$(".hour").html("00");
			$(".minute").html("00");
			$(".second").html("00");
		}
	}
	function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
		if(i < 10) {
			i = "0" + i;
		}
		return i;
	}







