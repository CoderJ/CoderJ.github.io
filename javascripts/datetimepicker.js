$(function(){
	Date.prototype.Format = function(fmt)   
	{ //author: meizz   
	  var o = {   
	    "M+" : this.getMonth()+1,                 //月份   
	    "d+" : this.getDate(),                    //日   
	    "h+" : this.getHours(),                   //小时   
	    "m+" : this.getMinutes(),                 //分   
	    "s+" : this.getSeconds(),                 //秒   
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	    "S"  : this.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	} 	
	$.fn.dtp = function(opt){
		var defOpt = {
			topFix:6,
			format:'yyyy-MM-dd'
		};

		opt = $.extend(true,{},defOpt,opt||{});
		var EventUtil = {

		    addHandler: function(element, type, handler){
		        if (element.addEventListener){
		            element.addEventListener(type, handler, false);
		        } else if (element.attachEvent){
		            element.attachEvent("on" + type, handler);
		        } else {
		            element["on" + type] = handler;
		        }
		    },
			
			removeHandler: function(element, type, handler){
		        if (element.removeEventListener){
		            element.removeEventListener(type, handler, false);
		        } else if (element.detachEvent){
		            element.detachEvent("on" + type, handler);
		        } else {
		            element["on" + type] = null;
		        }
		    },
			
			getEvent: function(event) {
		        return event ? event : window.event;
		    },
			
			getTarget: function(event) {
				return event.target || event.srcElement;    
			},
			
			getWheelDelta: function(event) {
		        if (event.wheelDelta){
		            return event.wheelDelta;
		        } else {
		            return -event.detail * 40;
		        }
		    },
			
			preventDefault: function(event) {
		        if (event.preventDefault){
		            event.preventDefault();
		        } else {
		            event.returnValue = false;
		        }
		    }
		    
		};
		var dateMax = function(d){
			if(d.month == 2){
				if((d.year%100!=0&&d.year%4==0) || (d.year%400==0)){
					return 29;
				}else{
					return 28;
				}
			}else if(d.month == 4 || d.month == 6 || d.month == 9 || d.month == 11){
				return 30;
			}else{
				return 31;
			}
		}
function onWheel(event) {

	event = EventUtil.getEvent(event);
	var curElem = EventUtil.getTarget(event);
	var curVal = parseInt(curElem.value);
	var delta = EventUtil.getWheelDelta(event);
	
	if (delta > 0) {
		curElem.value = curVal + 1;
	} else{ 
		curElem.value = curVal - 1;
	}
	
	EventUtil.preventDefault(event);
	
}

		$(this).each(function(){
			var input = $(this);
			if($(this).val())
				var now = new Date($(this).val());
			else
				var now = new Date();
			var date = {
				year : now.getFullYear(),
				month:now.getMonth()+1,
				date:now.getDate(),
				day:now.getDay(),
				hour:now.getHours(),
				minute:now.getMinutes(),
				second:now.getSeconds()
			};
			var picker = $("<div class='dtp'></div>");
			var yearUl = $('<ul class="dtp-year" data-type="year"></ul>');
			var dd = -30;
			for(i=date.year-3;i<=date.year+3;i++){
				yearUl.append("<li style='top:"+dd+"px;'>"+i+"</li>");
				dd = dd+30;
			}
			var dd = -30;
			var monthUl = $('<ul class="dtp-month" data-type="month"></ul>');
			for(i=date.month+12-3;i<=date.month+12+3;i++){
				monthUl.append("<li style='top:"+dd+"px;'>"+(i%12==0?12:i%12)+"</li>");
				dd = dd+30;
			}
			var dd = -30;
			var dateUl = $('<ul class="dtp-date" data-type="date"></ul>');
			for(i=dateMax(date)+date.date-3;i<=dateMax(date)+date.date+3;i++){
				dateUl.append("<li style='top:"+dd+"px;'>"+(i%dateMax(date)==0?dateMax(date):i%dateMax(date))+"</li>");
				dd = dd+30;
			}
			yearUl.appendTo(picker);
			monthUl.appendTo(picker);
			dateUl.appendTo(picker);
			//picker.append('<ul class="dtp-year"></ul><ul class="dtp-month"></ul><ul class="dtp-date"></ul>');
			picker.css({
				top : input.offset().top+input.height()+opt.topFix,
				left: input.offset().left
			});
			var calcDate = function(type,num){
				var nowNum = date[type];
				var calc = {
					'year' : function(){
						return (nowNum+num)<1970?(nowNum+num+100):((nowNum+num)>=(1970+100)?(nowNum+num-100):(nowNum+num));
					},
					'month': function(){
						var res = nowNum+num;
						while(res<=0){res = res+12;}
						return res%12==0?12:res%12;
					},
					'date': function(){
						var res = nowNum+num;
						while(res<=0){res = res+dateMax(date);}
						return res%dateMax(date)==0?dateMax(date):res%dateMax(date);						
					}
				};
				return calc[type]();

			}
			var dateFix = function(){
				var rightDate = date.date%dateMax(date);
				rightDate = rightDate == 0?dateMax(date):rightDate;
				date.date = rightDate;
				var dd = -30;
				dateUl.empty();
				for(i=dateMax(date)+date.date-3;i<=dateMax(date)+date.date+3;i++){
					dateUl.append("<li style='top:"+dd+"px;'>"+(i%dateMax(date)==0?dateMax(date):i%dateMax(date))+"</li>");
					dd = dd+30;
				}					
			}
			var down = function(curElem){
					curElem.prepend("<li style='top:-60px;'>"+calcDate(curElem.data("type"),-4)+"</li>");
					curElem.find("li").each(function(i,e){
						$(this).css({"top":(i-1)*30});
					});
					curElem.find("li:last").remove();
					date[curElem.data("type")] = calcDate(curElem.data("type"),-1);
					if(curElem.data("type")=='month')
						dateFix();
			}
			var up = function(curElem){
					curElem.append("<li style='top:180px;'>"+calcDate(curElem.data("type"),4)+"</li>");
					curElem.find("li").each(function(i,e){
						$(this).css({"top":(i-2)*30});
					});	
					curElem.find("li:first").remove();
					date[curElem.data("type")] = calcDate(curElem.data("type"),1);		
					if(curElem.data("type")=='month')
						dateFix();
			}
			var onWheel = function(event) {

				event = EventUtil.getEvent(event);
				var curElem = $(EventUtil.getTarget(event)).closest("ul");
				var delta = EventUtil.getWheelDelta(event);
				
				if (delta > 0) {
					down(curElem);
				} else{
					up(curElem);
				}
				var newDate = new Date(date.year+'-'+date.month+'-'+date.date+' '+date.hour+':'+date.minute+':'+date.second);
				input.val(newDate.Format(opt.format));
				EventUtil.preventDefault(event);
				
			}


			picker.find("ul").hover(function(){
				$(this).addClass("dtp-active");
				EventUtil.addHandler(document,'mousewheel',onWheel);
				EventUtil.addHandler(document,'DOMMouseScroll',onWheel);
				$(this).click(function(e){
					if($.inArray(e.target,$(this).find("li"))<3){
					down($(this));
				var newDate = new Date(date.year+'-'+date.month+'-'+date.date+' '+date.hour+':'+date.minute+':'+date.second);
				input.val(newDate.Format(opt.format));
				EventUtil.preventDefault(event);

					}else if($.inArray(e.target,$(this).find("li"))>3){
					up($(this));
				var newDate = new Date(date.year+'-'+date.month+'-'+date.date+' '+date.hour+':'+date.minute+':'+date.second);
				input.val(newDate.Format(opt.format));
				EventUtil.preventDefault(event);

					}
				});
			},function(){
				$(this).removeClass("dtp-active");
				EventUtil.removeHandler(document,'mousewheel',onWheel);
				EventUtil.removeHandler(document,'DOMMouseScroll',onWheel);				
			});
			$("input").focus(function(){
				picker.appendTo($('body'));
			});
			/*$("input").blur(function(){
				picker.remove();
			});*/
			$("body").click(function(e){
				

			});
		});

	}
})