/**
 * Created by 崔启蒙 on 2018/4/19.
 */
angular.module("app")
    .service("UserService", function($state, $timeout, qmHttp, $cordovaToast, Tools, $injector){
        var userinfo = null;
        var _interval_u = null;
        function StartAfter(time_ms){
            var delay_ms = time_ms;
            _interval_u = $timeout(function(){
                var param = {
                    "userName": userinfo.userName,
                    "password":userinfo.password,
                    "userApiKey":userinfo.userApikey,
                    "lastCode":userinfo.flagCode
                };
                qmHttp.Post("user/getUserCode.html", param)
                    .then(function (data) {
                        userinfo.flagCode = data.flagCode;
                        userinfo.fialTime = data.fialTime;
                        delay_ms = new Date(userinfo.fialTime) - new Date() - 60 * 10 * 1000;
                        $timeout.cancel(_interval_u);
                        StartAfter(delay_ms);
                    }, function(err){
                        $cordovaToast.show("网络错误，请重新登录", 'short', 'center')
                        _Logout();
                    })
            }, time_ms);
        }
        function _Logout(){
            //todo 调接口?
            userinfo = null;
            $timeout.cancel(_interval_u);
            $injector.get('DeviceService').StopTimer();
            $state.go('app.login')
        }
        return {
            SetUser: function(data){
                userinfo = data;
                this.UpdateUserCode();
            },
            GetUser: function () {
                return userinfo;
            },
            GetUserFlagCode: function () {
                return userinfo.flagCode;
            },
            GetUserUserApiKey: function () {
                return userinfo.userApikey;
            },
            GetUserCompanyApiKey: function () {
                return userinfo.companyApiKey;
            },
            /**
             * 签名（方式:用户apikey+企业apikey+标识码 用MD5加密）
             * @returns {*}
             * @string
             */
            GetSign: function(){
                return Tools.MD5_hex(this.GetUserUserApiKey()+this.GetUserCompanyApiKey()+this.GetUserFlagCode());
            },
            Login: function (id, password) {
                var param = {
                    "userName": id || userinfo.userName,
                    "password": password||userinfo.password,
                    "userApiKey":userinfo.userApikey,
                    "lastCode":userinfo.flagCode
                };
                qmHttp.Post("user/getUserCode.html", param)
                    .then(function (data) {
                        userinfo.flagCode = data.flagCode;
                        userinfo.fialTime = data.fialTime;
                    }, function(err){
                        $cordovaToast.show("网络错误，请重新登录", 'short', 'center')
                        _Logout();
                    })
            },
            UpdateUserCode: function () {
                if(userinfo===null){
                    return;
                }
                var initInvalidTimeMs = new Date(userinfo.fialTime) - new Date();
                StartAfter(initInvalidTimeMs);
            },
            Logout: _Logout
        }
    })