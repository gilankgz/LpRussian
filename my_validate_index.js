(function($) {
	$.fn.validate					= function(options){
		var defaults				= {};
		var opts					= $.extend(defaults, options);
		$('#regForm').submit(function () {
			var validate				= '';
			validate					= new $.validate2(opts);
			validate.init();
			return validate.subform();
		})
		$('#regForm input').blur(function() {
			/*if( opts.point_type == 'tips' ) {
				var validate				= '';
				validate					= new $.validate2(opts);
				validate.init();
				validate.check($(this).attr('id'));
			}*/
		});
	}

	$.validate2				= function(opts) {
		this.settings		= opts;
		this.rules			= new Array('checkDate', 'requireTo', 'require', 'regexp', 'minlen', 'maxlen', 'unique', 'checked', 'to', 'selected');
		this.rule			= new Array();
		this.message		= new Array();
		this.current_rule	= new Array();
		this.current_msg	= new Array();
		this.current_field	= new Array();
		this.jstips			= this.settings.jstips;
		this.field_name		= new Array();
		this.point_key_array= new Array();
		this.point_msg_array= new Array();
		this.rule_index		= 0;
		//this.init();
		//this.subform();
	}

	$.extend($.validate2, {
		prototype: {
			init	: function() {
				var err			= new Array();
				var	sign		= 0;

				for( i in this.jstips) {
					this.rule[i]		= this.jstips[i].rule;
					this.message[i]		= this.jstips[i].message;
					this.field_name[i]	= this.jstips[i].field_name;
					$('#'+this.field_name[i]).bind('focus', this.cancel_html);
				}
			},
			subform	: function() {
                                $(".intsva").hide();
				var rule_array;
				for( j in this.rule ) {
					rule_array			= this.get_rule_or_msg(String(this.rule[j]));
					msg_array			= this.get_rule_or_msg(String(this.message[j]));
					if(!rule_array)		continue;
					this.get_point_info(rule_array, msg_array, this.field_name[j]);
				}
				return this.point_msg();
			},
			cancel_html		: function() {
				//$('#'+$(this).attr('id')).css('border', '1px solid #7F9DB9');
				$('#pointmsg_'+$(this).attr('id')).css('display','none');
			},
			check			:	function() {
				for( j in this.field_name ) {
					if(this.field_name[j] == arguments[0]) {
						rule_array			= this.get_rule_or_msg(String(this.rule[j]));
						msg_array			= this.get_rule_or_msg(String(this.message[j]));
						this.get_point_info(rule_array, msg_array, this.field_name[j]);
						break;
					}
				}
				return this.point_msg();
			},
			get_rule_or_msg : function(string) {
				return string == '' ? false : string.split('|');
			},
			get_point_info	: function(rule_array, msg_array, field_name) {
				this.current_rule	= rule_array;
				this.current_msg	= msg_array;
				this.current_field	= field_name;
				if($('#'+this.current_field).attr("type")=='text'){
					$('#'+this.current_field).val(	this.trim($('#'+this.current_field).val()) 	);
				}
				return this.trans_func();
			},
			trans_func		: function() {
				this.rule_index		= 0;
				for( j in this.current_rule ) {
					for( i in this.rules ) {
						if(this.trim(this.current_rule[j]).indexOf(this.rules[i]) >= 0) {
							this.__request(this.rules[i]);
						}
					}
					this.rule_index_add(); 
				}
				
			},
			__request	: function() {
				eval('this.'+arguments[0]+'()');
			},
			set_point_msg	: function(){
				i			= this.point_key_array.length > 0 ? this.point_key_array.length : 0;
				this.point_key_array[i]	= this.current_field;
				this.point_msg_array[i]	= this.current_msg[this.get_rule_index()];
				return;
			},
			point_msg		: function() {
				var issubmit	= this.settings.point_type == 'tips' ? this.tips_point_msg() : this.alert_point_msg();
				return issubmit;
			},
			tips_point_msg	: function() {
				var issubmit	= true;
				for( i in this.point_key_array ) {

					$('#'+this.point_key_array[i]+'_tips').html('');
					issubmit				= false;
					//$('#'+this.point_key_array[i]).css('border', '1px solid red');
					this.err_div(this.point_key_array[i], this.point_msg_array[i]);
					
					return false;
				}
				return issubmit;
			},
			err_div		: function() {
				if(typeof(this.settings.tips_height)=='undefined'){
					this.settings.tips_height=0;
				}
				if($('#pointmsg_'+arguments[0]).size() == 0){
					offset		= $('#'+arguments[0]).offset();
					height		= $('#'+arguments[0]).height() + 10;
					div	= "<div style='position:absolute;_height:25px;_padding:5px 0;display:block;top:"+(offset.top-height)+"px;#top:"+(offset.top-height-4)+"px;left:"+(offset.left)+"px' class='intsva' id='pointmsg_"+arguments[0]+"' ><p><img src='../images/inbtiao01.gif' />"+arguments[1]+"</p></div>";
					$(div).appendTo('body'); 
				}else{
					errmsg		= "<p><img src='../images/inbtiao01.gif' />"+arguments[1]+"</p>";
					$('#pointmsg_'+arguments[0]).html(errmsg);
					$('#pointmsg_'+arguments[0]).css('display', 'block')
				}
				//$('#'+arguments[0]).focus();
			},
			alert_point_msg	: function() {
				var issubmit	= true;
				var message		= '';
				for( i in this.point_key_array ) {
					issubmit				= false;
					message					= message + this.trim(this.point_msg_array[i])+'\r\n';
				}
				if(message != '')	alert(message);
				return issubmit;
			},
			rule_index_add	: function() {
				this.rule_index	= this.rule_index + 1;
				return;
			},
			get_rule_index	: function() {
				return this.rule_index;
			},
			checkDate: function() {
				patt			= this.current_rule[this.get_rule_index()].split('&&');
				patt[1]			= patt[1].split('-');
				year			= this.trim(patt[1][0]);
				month			= this.trim(patt[1][1]);
				
				year	= $('#'+year).val();
				month	= $('#'+month).val();
				day		= $('#'+this.current_field).val();
				str = year+"-"+month+"-"+day;
				var reg =/^[12]\d{3}-(0[1-9]|1[0-2])-([0-2]\d|3[0-1])/;   
				if(reg.test(str)){   
					var arr = str.split('-');   
					var dt2 = new Date(arr[0],arr[1]-1,arr[2]);   
					var fullYear = dt2.getFullYear();   
					var fullMonth = dt2.getMonth() + 1;   
					var date =  dt2.getDate();   
					if(arr[0]!=fullYear || arr[1]!=fullMonth || arr[2]!=date)	this.set_point_msg();
				}
			},
			requireTo: function() {
				patt			= this.current_rule[this.get_rule_index()].split('&&');
				patt[1]			= this.trim(patt[1]);
				value	= $('#'+this.current_field).val();
				if(value == patt[1])	this.set_point_msg();
			},
			require	: function() {
				value	= $('#'+this.current_field).val();
				if(value == '')	this.set_point_msg();
			},
			regexp	: function() {
				patt			= this.current_rule[this.get_rule_index()].split('&&');
				patt[1]			= this.trim(patt[1]);
				temppatt		= new RegExp(patt[1]);
				value			= $('#'+this.current_field).val();
				if ( !temppatt.test(value) && value != ''){this.set_point_msg();}
				return;
			},
			minlen	: function() {
				patt			= this.current_rule[this.get_rule_index()].split('&&');
				value			= $('#'+this.current_field).val();
				if( value.length < patt[1] ) this.set_point_msg();
				return;
			},
			maxlen	: function() {
				patt			= this.current_rule[this.get_rule_index()].split('&&');
				value			= $('#'+this.current_field).val();
				if( value.length > patt[1] ) this.set_point_msg();
			},
			unique	: function() {
				var returnvalue	= '';
				patt			= this.current_rule[this.get_rule_index()].split('&&');
				value			= $('#'+this.current_field).val();
				patt[1]			= this.trim(patt[1])+'&'+this.current_field+'='+value;
				if(value != ''){
					msg			= this.ajax(patt[1]);
					eval('msg='+ msg +';'); 
					if (!msg.bool_msg) {
						return;
					}
					this.rule_index = msg.bool_msg;
					this.set_point_msg();
				}
			},
			ajax	: function(url) {
					var xmlhttp;
					if(window.XMLHttpRequest) {
						//针对FireFox,Mozillar,Opera,Safari,IE7,IE8
						xmlhttp = new XMLHttpRequest();
						//针对某些特定版本mozillar浏览器的BUG进行修正
						if(xmlhttp.overrideMimeType) {
							xmlhttp.overrideMimeType("text/xml");	
						}
					}
					else if(window.ActiveXObject) {
						//针对IE6,5.5,5
						//两个可以创建XMLHttpRequest对象的空间名称，保存在一个JS数组中
						//排在前面的版本较新
						var activeName = ['MSXML2.XMLHTTP','Microsoft.XMLHTTP'];
						for(var i=0;i<activeName.length;i++) {
							try {
								//取出一个空间名进行创建，如果创建成功就终止循环
								//如果创建失败，会抛出异常，然后可以继续循环，继续尝试创建
								xmlhttp = new ActiveXObject(activeName[i]);
							}
							catch(e) {}
						}
					}
					xmlhttp.open("GET",url,false);
					xmlhttp.send(null);
					return xmlhttp.responseText;
			},

			checked	: function() {
				if( !$('#'+this.current_field).attr('checked')) {this.set_point_msg();}
				return;
			},
			to		: function() {
				patt			= this.current_rule[this.get_rule_index()].split('&&');
				value1			= $('#'+this.current_field).val();
				value2			= $('#'+this.trim(patt[1])).val();
				if(value1 != value2) this.set_point_msg();
				return;
			},
			trim	: function(sString){
				return sString.replace(/(^\s*)|(\s*$)/g, "");    
			}
			
		}
	})
		
			
})(jQuery)