/**
 * Created by 崔启蒙 on 2018/4/18.
 */
var app = angular.module("app.service", ['ajoslin.promise-tracker']);
app.config(['$httpProvider', function ($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.interceptors.push('httpInterceptor');

}]);
app.factory('httpInterceptor', [ '$q', '$injector',function($q, $injector) {
    var httpInterceptor = {
        'responseError' : function(response) {
            return $q.reject(response);
        },
        'response' : function(response) {
            // var arr= ["Z1D327523KS4CO6Z", "8L2R8650H6EWC39U", "P12P4S5337L234YB", "M03BP963B4XAD9WK","ZX78IG9Z23XWM3HE","O35X654TXV344JP8"];
            if(response.data.flag == '03'){
                //登录信息失效？
                $injector.get('$cordovaToast').show("身份验证失败，请重新登录！", 'long', 'bottom');
                $injector.get('UserService').Logout();
            }
            return response;
        },
        'request' : function(config) {
            return config;
        },
        'requestError' : function(config){
            return $q.reject(config);
        }
    }
    return httpInterceptor;
}]);
app.factory("qmHttp", ["$rootScope", "$http", "$q", "$location", "$state", "promiseTracker", "$injector", "config",
    function ($rootScope, $http, $q, $location, $state, promiseTracker, $injector, config) {
    $rootScope.loadingTracker = promiseTracker();
    function _GetRequestUrl(url, isTestAPI) {
        if(url.indexOf('http:')>-1){
            return url;
        }
        if (!config.isTestAPI && !isTestAPI) {
            return config.BASEURL + url;
        }
        return "json/" + url + ".json";
    }
    /**
     * @name Post
     * @param url
     * @param formData
     * @param config
     *              test: boolean 默认为false，为true时使用本地测试json的地址。
     *              timeout: integer 默认为0，超时时间(ms)
     *              tracker: promiseTracker|boolean 默认为true(使用全局追踪器$rootScope.loadingTracker)。当传入false时，则不触发追踪器；
     *                                              当传入类型是promiseTracker时，则使用传入的追踪器。（追踪器可以使用CreateTracker创建）
     *              popupError: boolean 默认为true 表示是否使用默认的错误码处理方法
     *              popupErrorHandler: function 默认为angular.noop() 可以自定义默认处理方法的回调方法
     * @return {promise|{then, catch, finally}|*}
     * @private
     */
    function _Post(url, formData, config) {
        var isTestAPI = config?config.test:false;
        !config && (config={});
        !config.hasOwnProperty('popupError') && (config.popupError = true);
        // var needTracker = config?config.tracker:true;
        var _tracker = $rootScope.loadingTracker;
        if(config && config.hasOwnProperty('tracker')){
            if(typeof config.tracker == "boolean"){
                config.tracker || (_tracker = false);
            }else{
                _tracker = config.tracker;
            }
        }
        var deferred = $q.defer();
        var resp = $http.post(_GetRequestUrl(url, isTestAPI), formData,
            {
                tracker: _tracker,
                timeout: config&&config.timeout||0
            });
        resp.then(function (data) {
                __errorHandler(data, config, deferred);
                deferred.resolve(data.data);
            },
            function (data) {
                deferred.reject({Code: data.status, Message: "服务器发生错误"});
            });
        return deferred.promise;
    }

    function _Get(url, param, config) {
        var isTestAPI = config?config.test:false;
        var _tracker = $rootScope.loadingTracker;
        if(config && config.hasOwnProperty('tracker')){
            if(typeof config.tracker == "boolean"){
                config.tracker || (_tracker = false);
            }else{
                _tracker = config.tracker;
            }
        }
        var deferred = $q.defer();
        var resp = $http.get(_GetRequestUrl(url, isTestAPI), {
            params: param,
            tracker: _tracker,
            timeout: config&&config.timeout||0
        }).then(function (data) {
                __errorHandler(data, config, deferred);
                deferred.resolve(data.data);
            },
            function (data) {
                deferred.reject({Code: data.status, Message: "服务器发生错误"});
            });
        return deferred.promise;
    }

    function _ImgUrl(key, sizeParam) {
        if (angular.isString(key) == false || !key) {
            return "";
        }
        if (key.indexOf("http") != -1 || key.indexOf("asset") != -1) {
            return key;
        }
        if (!!sizeParam) {
            key += "!";
            key += sizeParam;
        }
        return Config.baseUrl.Image + key;
    }

    /**
     * @name 创建追踪器
     * @param option
     * options.minDuration : Allow an optional "minimum duration" that the tracker has to stay active for.
     * options.activationDelay : Allow a delay that will stop the tracker from activating until that time is reached
     * @return {*}
     * @private
     */
    function _CreateTracker(option){
        return promiseTracker(option);
    }

    function __errorHandler(data, config){
        if(config && config.popupError && data.data.flag !== '00'){
            $injector.get('Widget').ShowAlert(data.data.msg, data.config.url)
                .then(config.popupErrorHandler || angular.noop());
            var e = new Error();
            var str = e.stack.substring(e.stack.indexOf('at'), e.stack.indexOf('infra')+16);
            e.stack = "------------------------------------------错误信息------------------------------------------";
            e.stack += "\n\t接  口："+ data.config.url;
            e.stack += '\n\t错误码：'+data.data.flag;
            e.stack += '\n\t入  参：'+ JSON.stringify(data.config.params);
            e.stack += '\n\t消  息：' + data.data.msg;
            // e.stack += '\n\t异  常：' + data.data.Proposal.substring(0, 100).replace(/\n/g, "").trim();
            e.stack += "\n" + str + "\n---------------------------------------------------------------------------------------------";
            throw e;
        }
    }

    return {
        Post: _Post,
        Get: _Get,
        ImgUrl: _ImgUrl,
        RequestUrl: _GetRequestUrl,
        CreateTracker: _CreateTracker
    }
}]);
app.service("EventBus", [function () {
    var subscriberList = [];

    function _subscribe(evt, fn) {
        for (var i = 0; i < subscriberList.length; ++i) {
            if (subscriberList[i].Event === evt && subscriberList[i].Fn === fn) {
                return;
            }
        }
        subscriberList.push({Event: evt, Fn: fn});
    }

    function _unsubscribe(evt, fn) {

        for (var i = 0; i < subscriberList.length; ++i) {
            if (subscriberList[i].Event === evt && subscriberList[i].Fn === fn) {
                break;
            }
        }
        subscriberList.splice(i, 1);

    }

    function _publish(evt, data) {

        for (var i = 0; i < subscriberList.length; ++i) {
            if (subscriberList[i].Event === evt) {
                subscriberList[i].Fn(data);
            }
        }
    }

    return {
        Subscribe: _subscribe,
        Unsubscribe: _unsubscribe,
        Publish: _publish
    };

}]);
app.service("Tools", function(){
    var NumberCode = true;
    return {
        getGVerify:function (id)
        {

            function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
                this.options = { //默认options参数值
                    id: "", //容器Id
                    canvasId: "verifyCanvas", //canvas的ID
                    width: "125", //默认canvas宽度
                    height: "50", //默认canvas高度
                    type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
                    code: ""
                }

                if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
                    for(var i in options) { //根据传入的参数，修改默认参数值
                        this.options[i] = options[i];
                    }
                }else{
                    this.options.id = options;
                }

                this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
                this.options.letterArr = getAllLetter();

                this._init();
                this.refresh();
            }

            GVerify.prototype = {
                /**版本号**/
                version: '1.0.0',

                /**初始化方法**/
                _init: function() {
                    var con = document.getElementById(this.options.id);
                    var canvas = document.createElement("canvas");
                    /*this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
                     this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";*/
                    canvas.id = this.options.canvasId;
                    canvas.width = this.options.width;
                    canvas.height = this.options.height;
                    canvas.style.cursor = "pointer";
                    canvas.innerHTML = "您的浏览器版本不支持canvas";
                    con.appendChild(canvas);
                    var parent = this;
                    canvas.onclick = function(){
                        parent.refresh();
                    }
                },

                /**生成验证码**/
                refresh: function() {
                    this.options.code = '';
                    var canvas = document.getElementById(this.options.canvasId);
                    if(canvas.getContext) {
                        var ctx = canvas.getContext('2d');
                    }
                    ctx.textBaseline = "middle";

                    ctx.fillStyle = randomColor(0, 0);
                    ctx.fillRect(0, 0, this.options.width, this.options.height);

                    if(this.options.type == "blend") { //判断验证码类型
                        var txtArr = this.options.numArr.concat(this.options.letterArr);
                    } else if(this.options.type == "number") {
                        var txtArr = this.options.numArr;
                    } else {
                        var txtArr = this.options.letterArr;
                    }

                    for(var i = 1; i <= 4; i++) {
                        var txt = txtArr[randomNum(0, txtArr.length)];
                        this.options.code += txt;
                        ctx.font = '30px SimHei';
                        //ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
                        ctx.fillStyle = randomColor(255, 255); //随机生成字体颜色
                        /* ctx.shadowOffsetX = randomNum(-3, 3);
                         ctx.shadowOffsetY = randomNum(-3, 3);*/
                        ctx.shadowBlur = randomNum(-3, 3);
                        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                        var x = this.options.width / 5 * i;
                        var y = this.options.height / 2;
                        var deg = randomNum(-30, 30);
                        /**设置旋转角度和坐标原点**/
                        ctx.translate(x, y);
                        ctx.rotate(deg * Math.PI / 180);
                        ctx.fillText(txt, 0, 0);
                        /**恢复旋转角度和坐标原点**/
                        ctx.rotate(-deg * Math.PI / 180);
                        ctx.translate(-x, -y);
                    }
                    /**绘制干扰线**/
                    for(var i = 0; i < 4; i++) {
                        ctx.strokeStyle = randomColor(40, 180);
                        ctx.beginPath();
                        ctx.moveTo(randomNum(0, this.options.width/2), randomNum(0, this.options.height/2));
                        ctx.lineTo(randomNum(0, this.options.width/2), randomNum(0, this.options.height));
                        ctx.stroke();
                    }
                    /**绘制干扰点**/
                    for(var i = 0; i < this.options.width/4; i++) {
                        ctx.fillStyle = randomColor(0, 255);
                        ctx.beginPath();
                        ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                },

                /**验证验证码**/
                validate: function(code){
                    var verifyCode = NumberCode?code:code.toLowerCase();
                    var v_code = NumberCode?this.options.code:this.options.code.toLowerCase();
                    if(verifyCode == v_code){
                        return true;
                    }else{
                        return false;
                    }
                }
            }

            /**生成字母数组**/
            function getAllLetter() {
                var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
                if(NumberCode){
                    letterStr = "1,2,3,4,5,6,7,8,9,0";
                }
                return letterStr.split(",");
            }
            /**生成一个随机数**/
            function randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }
            /**生成一个随机色**/
            function randomColor(min, max) {
                var r = randomNum(min, max);
                var g = randomNum(min, max);
                var b = randomNum(min, max);
                return "rgb(" + r + "," + g + "," + b + ")";
            }

            return new GVerify(id);
        },
        MD5_hex: function(s){
            return md5(s);
            // var hash = md5.create();
            // hash.update('Message to hash');
            // hash.hex();
        }
    }
})