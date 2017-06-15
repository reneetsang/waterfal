//test
function getWin(attr){
	return document.body[attr] || document.documentElement[attr];
}


function getByClass(cls,parent){
	var parent=parent || document;
	var all=parent.getElementsByTagName("*");
	var r=[];
	var reg=new RegExp("(^|\s+)"+cls+"(\s+|$)");
	for(var i=0;i<all.length;i++){
		if(reg.test(all[i].className)){
			r[r.length]=all[i];
		}
	}
	return r;
}

function offset(ele){
	var t=ele.offsetTop;
	var l=ele.offsetLeft;
	
	var p=ele.offsetParent;
	while(p){

		var reg=/MSIE 8/;
		if(!reg.test(navigator.userAgent)){
			t+=p.clientTop;
			l+=p.clientLeft;
		}
		t+=p.offsetTop;
		l+=p.offsetLeft;
		
		p=p.offsetParent;
		
	}
	return {top:t,left:l};
}