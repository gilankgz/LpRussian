jQuery.AutoComplete = function(selector){
	var elt = $(selector);
	var strHtml = '<div class="AutoComplete" id="AutoComplete">'+
				'		<ul class="AutoComplete_ul">'+
				//'			<li class="AutoComplete_title">请选择邮箱后缀</li>'+
				'			<li id="mail1" hz="@gmail.com"></li>'+
				'			<li id="mail2" hz="@hotmail.com"></li>'+
				'			<li id="mail3" hz="@msn.com"></li>'+
				'			<li id="mail4" hz="@live.com"></li>'+
				'			<li id="mail5" hz="@yahoo.com"></li>'+
				'			<li id="mail6" hz="@outlook.com"></li>'+
				'			<li id="mail7" hz="@aol.com"></li>'+
				'			<li id="mail8" hz="@aim.com"></li>'+
				'			<li id="mail9" hz="@mail.com"></li>'+
				'			<li id="mail10" hz="@email.com"></li>'+
				'			<li id="mail11" hz="@inbox.com"></li>'+
				'			<li id="mail12" hz="@ask.com"></li>'+
				'		</ul>'+
				'	</div>';
	$('body').append(strHtml);
	var autoComplete,autoLi;
	autoComplete = $('#AutoComplete');
	autoComplete.data('elt',elt);
	autoLi = autoComplete.find('li:not(.AutoComplete_title)');
	autoLi.mouseover(function(){
		$(this).siblings().filter('.hover').removeClass('hover');
		$(this).addClass('hover');
	}).mouseout(function(){
		$(this).removeClass('hover');
	}).mousedown(function(){
		autoComplete.data('elt').val($(this).text()).change();
		autoComplete.hide();
	});
	//用户名翻动加补全
	elt.keyup(function(e){
		if(/13|38|40|116/.test(e.keyCode) || this.value==''){
			return false;
		}
		var username = this.value;
		
		autoLi.each(function(){
			this.innerHTML = username.replace(/\@+.*/,'')+$(this).attr('hz');
			if(this.innerHTML.indexOf(username)>=0){
				$(this).show();
				$(this).addClass('show');
			}else{
				$(this).hide();	
				$(this).removeClass('show');	
			}
		}).filter('.hover').removeClass('hover');
		autoComplete.show().css({
			left : $(this).offset().left,
			top : $(this).offset().top + $(this).outerHeight(true) + 2,
			position: 'absolute',
			zIndex: '99999'
		});
		if(autoLi.filter(':visible').length==0){
			autoComplete.hide();
		}else{
			autoLi.filter(':visible').eq(0).addClass('hover');			
		}
	}).keydown(function(e){
		if(e.keyCode==38){ //上
		     var o=$('#AutoComplete').find('.show');
			 var selecto=$('#AutoComplete').find('.hover');
			 var selectid=0;
			for(var i=0;i<o.length;i++){
				if(selecto.attr("id")==o.get(i).id){
					selectid=i;
					$("#"+o.get(i).id).removeClass('hover');
				}	
			}
			if(selectid>0){selectid=selectid-1;}
			$("#"+o.get(selectid).id).addClass('hover');
		}else if(e.keyCode==40){ //下
			var o=$('#AutoComplete').find('.show');
			 var selecto=$('#AutoComplete').find('.hover');
			 var selectid=0;
			for(var i=0;i<o.length;i++){
				if(selecto.attr("id")==o.get(i).id){
					selectid=i;
					
					$("#"+o.get(i).id).removeClass('hover');
				}	
			}
			if(selectid<o.length-1){selectid=selectid+1;}
			$("#"+o.get(selectid).id).addClass('hover');
		}else if(e.keyCode==13){ //Enter
			autoLi.filter('.hover').mousedown();
		}
	}).focus(function(){
		autoComplete.data('elt',$(this));
	}).blur(function(){
		autoComplete.hide();
	});
};