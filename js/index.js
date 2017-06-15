// window.addEventListener("load",reset,false);


function getHeightFromUrl(url){
	var reg=/\/(\d+)$/;
	var r=null;
	if(r=reg.exec(url)){
		return r[1];
	}else{
		return 200;
	}
}

function loadBox(frame,data){
	loadTime++;
	var frag=document.createDocumentFragment();
	for(var i=0;i<data.length;i++){
		var box=document.createElement("div");
		box.className="box";
		
		imgBox=document.createElement("div");
		imgBox.className="img";
		imgBox.setAttribute("imgUrl",data[i]);
		var imgHeight=getHeightFromUrl(data[i]);
		imgBox.style.height=imgHeight+"px";
		box.appendChild(imgBox);
		frag.appendChild(box);
	}
	frame.appendChild(frag);
	
	resetPosition();
}

function loadImg(){
	var boxes=getByClass("img");

	for(var i=0;i<boxes.length;i++){
		
		!function(i){
			var cur=boxes[i];

				var picBT=offset(cur).top+cur.offsetHeight;
				var winBT=getWin("scrollTop")+getWin("clientHeight");

				if(winBT>=picBT){
					var img=new Image;
					img.src=cur.getAttribute("imgUrl");
					img.onload=function(){
						// alert(cur.isLoad);
						if(!cur.isLoad){
						cur.appendChild(this);
						show(this);
						cur.isLoad=true;
						if(i==boxes.length-1){
							if(loadTime>5){
							var loadBtn=document.getElementById("loadmore");
							// alert(loadBtn);
							loadBtn.style.display="block";
							loadBtn.onclick=function(){
								loadBox(document.getElementById("wrapper"),getData(15));
								this.style.display="none";
							}
							}else{
								loadBox(document.getElementById("wrapper"),getData(15));			
							}

						}
					}
				}
			}
		}(i);

	}
}

function show(ele){
	var p=0;
	var count=0;
	var timer=window.setInterval(function(){
		if(count<1){
			count+=0.05;

		}else{
			window.clearInterval(timer);
			timer=null;	
		}
		ele.style.opacity=count;
			
	},30)
}

function fixNav(){
	var header=document.getElementsByTagName("header")[0];
	if(getWin("scrollTop") > 20){
		header.className="fixed";
	}else{
		header.className="top";
	}
}

function backFn(){
	if(!backBtn.lalala){
	var h=getWin("clientHeight");
	if(getWin("scrollTop")>h){
		backBtn.className="show";
	}else{
		backBtn.className="hidden";
	}
	}
}

function toTop(){
	var timer=null;
	backBtn.className="hidden";
	backBtn.lalala=true;
	timer=window.setTimeout(fn,30);
	
	function fn(){
		var before=getWin("scrollTop");
		document.body.scrollTop=getWin("scrollTop")*0.7-1;
		var after=getWin("scrollTop");
		if(before==after){
			timer=null;
			window.clearTimeout(timer);
			backBtn.className="show";
			backBtn.lalala=false;
		}else{
			timer=setTimeout(fn,30);
		}
	}
}


function resetPosition(){
	var frame=document.getElementById("wrapper");
	var box=getByClass("box",frame);
	var boxWidth=box[1].offsetWidth;
	var cols=Math.floor(getWin("clientWidth")/boxWidth);
	frame.style.width=cols*boxWidth+"px";
	
	var pos=[];
	for(var i=0;i<box.length;i++){
		if(i<cols){
			pos.push(box[i].offsetHeight);
			box[i].style.left=i*boxWidth+"px";
			box[i].style.top=0;
		}else{
			// alert(pos);
			var minHeight=Math.min.apply(null,pos);
			// alert(minHeight);
			var index=pos.indexOf(minHeight);
			// alert(index);
			box[i].style.left=(index*boxWidth)+"px";
			box[i].style.top=pos[index]+"px";
			pos[index]=pos[index]+box[i].offsetHeight;
		}
	}
}




var frame=document.getElementById("wrapper");
loadBox(frame,getData(20));

var timer1=window.setTimeout(loadImg,500);

var loadTime=0;
window.addEventListener("scroll",loadImg,false);
window.addEventListener("scroll",fixNav,false);
var backBtn=document.getElementById("backtop");
window.addEventListener("scroll",backFn,false);
backBtn.addEventListener("click",toTop,false);
window.addEventListener("resize",resetPosition,false);

