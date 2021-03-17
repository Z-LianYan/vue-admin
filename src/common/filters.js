import Vue from 'vue'
// import dayjs from 'dayjs';
// import currency from 'currency.js';


Vue.filter("formatDate",function(timestamp,geshi){
	var d = dayjs(timestamp).format(geshi?geshi:"YYYY-MM-DD HH:mm:ss");
	if(d=='Invalid date'){
		return timestamp;
	}else{
		return d;
	}
});

