


function getData(n){
	var data=[];
	for(var i=0;i<n;i++){
		var height=Math.floor(Math.random()*300+100);
		data[data.length]="http://placekitten.com/230/"+height;
	}
	return data;
}