function Observer(data){
	this.data = data;
	this.walk(this.data);
	//this.event = new Event();
}

Observer.prototype.walk = function(obj){
	var val;
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			val = obj[key];
			if(isObject(val)){
				new Observer(val);
			}
			this.convert(key,val);
		}
	}		
}

Observer.prototype.convert = function(key,val){
	var self = this;
	Object.defineProperty(this.data,key,{
		get : function(){
			console.log("你访问了"+key);
			return val;
		},
		set : function(newVal){
			console.log("你设置了"+key+",新的值为"+newVal);
			Event.emit(key,newVal);
			val = newVal;
			if(isObject(newVal)){
				new Observer(val);
			}
		}
	})
}

Observer.prototype.$watch = function(key,fn){
	Event.on(key,fn);
}

function isObject(o){
	return Object.prototype.toString.call(o) == '[object Object]';
}

// function Event(){
// 	this.callbacks = {};
// }
// Event.prototype.on = function(event,fn){
// 	this.callbacks[event] = this.callbacks[event] || [];
// 	this.callbacks[event].push(fn);
// }
// Event.prototype.emit = function(event){
// 	this.callbacks[event] = this.callbacks[event] || [];
// 	var arg = Array.prototype.slice.call(arguments,1);
// 	this.callbacks[event].forEach(function(val){
// 			val.apply(val,arg);
// 	})
// }
var Event = {
	callbacks:{},
	on:function(event,fn){
		this.callbacks[event] = this.callbacks[event] || [];
	 	this.callbacks[event].push(fn);
	},
	emit:function(event){
		this.callbacks[event] = this.callbacks[event] || [];
	 	var arg = Array.prototype.slice.call(arguments,1);
	 	this.callbacks[event].forEach(function(val){
	 			val.apply(val,arg);
	 	})	
	}
}

var app = new Observer({
  name : {
	fName: 'y',
	lName: 'r'
  },
  age: 25
});

app.$watch('fName',function(name){console.log('name变成了'+name)});
app.$watch('age',function(age){console.log('age变成了'+age)});

app.data.name.fName = 'yr';
app.data.age = 100;
