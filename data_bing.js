(function(global) {
    function Observer(data, par) {
        this.data = data;
        this.par = par;
        this.walk(this.data, this.par);
        //this.event = new Event();
    }

    Observer.prototype.walk = function(obj, par) {
        var val;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (isObject(val)) {
                    new Observer(val, key);
                }
                this.convert(key, val, par);
            }
        }
    }

    Observer.prototype.convert = function(key, val, parName) {
        var self = this;
        Object.defineProperty(this.data, key, {
            get: function() {
                console.log("你访问了" + key);
                return val;
            },
            set: function(newVal) {
                console.log("你设置了" + key + ",新的值为" + newVal);
                if (parName) {
                    //self.event.emit(parName + '.' + key, newVal);
                    Event.emit(parName + '.' + key, newVal);
                } else {
                    //self.event.emit(key, newVal);
                    Event.emit(key, newVal);
                }
                val = newVal;
                if (isObject(newVal)) {
                    new Observer(val, key);
                }
            }
        })
    }

    Observer.prototype.$watch = function(key, fn) {
        //this.event.on(key, fn);
        Event.on(key, fn);
    }

    function isObject(o) {
        return Object.prototype.toString.call(o) == '[object Object]';
    }

    // function Event() {
    //     this.callbacks = {};
    // }
    // Event.prototype.on = function(event, fn) {
    //     this.callbacks[event] = this.callbacks[event] || [];
    //     this.callbacks[event].push(fn);
    // }
    // Event.prototype.emit = function(event) {
    //     this.callbacks[event] = this.callbacks[event] || [];
    //     var arg = Array.prototype.slice.call(arguments, 1);
    //     this.callbacks[event].forEach(function(val) {
    //         val.apply(val, arg);
    //     });
    //     var eventArr = event.split('.');
    //     eventArr.pop();
    //     if(eventArr.length){
    //      this.emit(eventArr.join('.'));
    //     }
    // }
    var Event = {
        callbacks: {},
        on: function(event, fn) {
            this.callbacks[event] = this.callbacks[event] || [];
            this.callbacks[event].push(fn);
        },
        emit: function(event) {
            this.callbacks[event] = this.callbacks[event] || [];
            var arg = Array.prototype.slice.call(arguments, 1);
            this.callbacks[event].forEach(function(val) {
                val.apply(val, arg);
            });
            var eventArr = event.split('.');
            eventArr.pop();
            if (eventArr.length) {
                this.emit(eventArr.join('.'));
            }
        }
    };
    /*var app = new Observer({
        name: {
            fName: 'y',
            lName: 'r'
        },
        age: 25
    });

    app.$watch('name.fName', function(name) { console.log(`name.fName变成了${name}`) });
    app.$watch('name', function(name) { console.log(`name也发生了变化`) });
    app.$watch('age', function(age) { console.log(`age变成了${age}`) });

    app.data.name.fName = 'yr';
    app.data.age = 100;*/

    function Vue(cfg){
        if(!isObject(cfg)){
            throw new Error('Please enter an Object');
        }
        var dom;
        if(cfg.el){
            dom = q(cfg.el);
        }
        
    }

    function q(el){
        var selector = el.splice(0,1);
        var dom = [];
        if(selector == "#"){
            dom.push(document.getElementById(el));
        }else if(selector == '.'){
            dom.concat(document.getElementsByClassName(el));
        }else if(selector == '['){
            dom.concat(document.querySelectorAll(el));
        }else{
            dom.concat(document.getElementsByTagName(el));
        }
    }

    global.Vue = Vue;
})(window);
