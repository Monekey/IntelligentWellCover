/**
 * Created by 崔启蒙 on 2018/4/18.
 */
angular.module('app')
    .controller('login', function($scope, $state, $window, qmHttp, $ionicLoading, Widget, UserService, $rootScope, Tools, $cordovaToast, UpdateService){
        $scope.user = {
            id: "",
            password: ""
        };
        $scope.valicode = "";
        var GV = Tools.getGVerify("valicode");
        $scope.logining = qmHttp.CreateTracker();
        $scope.login = function(){
                // $ionicLoading.show({
                //     template: 'Loading...'
                // });
            if(!GV.validate($scope.valicode)){
                // Widget.ShowAlert('验证码错误');
                /**
                 * 显示原生的toast
                 * message 要显示的消息
                 * duration 显示时长 long  short(2s左右)
                 * position 显示位置 'top', 'center', 'bottom'
                 * callback 显示成功的回调函数
                 */
                // document.addEventListener("deviceready", function () {
                console.log("验证码错误");
                $cordovaToast.show("验证码错误", 'short', 'bottom').then(function(){

                });
                // }, false);

                $scope.valicode = "";
                GV.refresh();
                return;
            }
            var param = {
                userName: $scope.user.id,
                password: $scope.user.password
            }
            qmHttp.Post("user/login.html", param, {
                tracker: $scope.logining,
                popupError: false
            })
                .then(function(data){
                    if(data.flag == "01"){
                        // Widget.ShowAlert("用户名或密码错误");
                        $cordovaToast.show("用户名或密码错误", 'short', 'bottom');
                        console.log("用户名或密码错误");
                        return;
                    }
                    data.password = param.password;
                    UserService.SetUser(data);
                    localStorage.setItem('USERINFO', JSON.stringify(param));
                    $state.go("app.main")
                },function(err){
                    Widget.ShowAlert(err.Code);
                })
            }
        var _user = localStorage.getItem('USERINFO');
        if(_user){
            $scope.user.id = JSON.parse(_user).userName;
            $scope.user.password = JSON.parse(_user).password;
            if($rootScope.app.firstLogin){
                // $scope.login();
                $rootScope.app.firstLogin = false;
            }
        }
        UpdateService.CheckUpdate();

    });