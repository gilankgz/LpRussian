function dispobj(obj){
	if(obj.style.display==""){
		obj.style.display="none";
	}else{
		obj.style.display="";
	}
}

function getPos(el,sProp) { 
	var iPos = 0
	while (el!=null) {
		iPos+=el["offset" + sProp]
		el = el.offsetParent
	}
	return iPos
}

function forgetpwd(obj){
	l=getPos(obj,'Left')-145;
	t=getPos(obj,'Top')+20;
	forgetpwdfrom.style.top=t;
	forgetpwdfrom.style.left=l;
	dispobj(forgetpwdfrom);
}

function showloginform(){
	divOpenWin.style.display='none';
	loginOpenWin.style.display='';
}

function showjoinform(){
	divOpenWin.style.display='';
	loginOpenWin.style.display='none';	
}
						   

function check_mail(Obj){
	var reEml = /^[\w\-\.]+@[a-z0-9]+(\-[a-z0-9]+)?(\.[a-z0-9]+(\-[a-z0-9]+)?)*\.[a-z]{2,4}$/i;
	if(!reEml.test(Obj.sendmail.value)){
		alert('Invalid email address!');
		Obj.sendmail.focus();
		return false;
	}
	return true;
}


function checklogin(obj){
	if(obj.email.value=='' || obj.email.value==obj.email.title){
		alert('Please enter your login email.');
		obj.email.focus();
		return false;
	}

	if(obj.password.value=='' || obj.password.value==document.loginform.password.title){
		alert('Please enter your password.');
		obj.password.focus();
		return false;
	}
	return true;
}


function cit(obj,type){
	if(type==1){
		if (obj.value==obj.title)
		{
			obj.value='';
		}	
	}else{
		if (obj.value=='')
		{
			obj.value=obj.title;
		}
	}
}



function ChangeProvince(v){
	if (v=='China'){
		document.form2.province.style.display='';
		document.form2.province1.style.display='none';
	}else{
		document.form2.province.style.display='none';
		document.form2.province1.style.display='';
	}
}


function getobj(sId)
{
	if (!sId) {
		return null;
	}
	var returnObj = document.getElementById(sId);
	if (!returnObj && document.all) {
		returnObj = document.all[sId];
	}
	return returnObj;
}



function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}