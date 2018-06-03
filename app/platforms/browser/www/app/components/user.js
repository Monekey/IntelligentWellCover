/**
 * Created by 崔启蒙 on 2018/4/21.
 */
angular.module("app")
    .controller('userCtrl', function($scope, UserService, UpdateService){
        $scope.UserService = UserService;
        $scope.CheckUpdate = function(){
            UpdateService.CheckUpdate('popup');
        }
    })
    .controller('settingCtrl', function($scope, config, DefaultConfig, Widget, $ionicPopup, $rootScope, DeviceService){
        $scope.config = config;
        $scope.ShowVConsole = false;
        $scope.reset = function(){
            $scope.config = config = DefaultConfig;
        }
        $scope.checkEmpty = function (key) {
            if($scope.config[key] === ""){
                $scope.config[key] = DefaultConfig[key]
            }else{
                console.log("设置成功，有些设置可能在重启软件后才会生效。");
                Widget.ShowAlert('设置成功，有些设置可能在重启软件后才会生效。')
            }
        };
        $scope.$on("$destroy", function(){
            window.localStorage.setItem("APP_CONFIG", JSON.stringify(config));
        });
        $scope.changeVConsole = function(){
            if($scope.ShowVConsole){
                vConsole.showSwitch();
            }else {
                vConsole.hideSwitch();
            }
        };
        $scope.TestTriggerAlarm = function(){
            DeviceService.TestTriggerAlarm();
        };
        $scope.ClearAlarmCache = function(){

        }
        $scope.OpenMoreSetting = function(){
           $ionicPopup.prompt({
                title: '验证管理员身份',
                // template: 'Enter your secret password',
                inputType: 'password',
                inputPlaceholder: '请输入密码'
               // buttons: [
               //     { text: '取消' },
               //     {
               //         text: '<b>确定</b>',
               //         type: 'button-positive',
               //         onTap: function(e) {
               //
               //         }
               //     }
               // ]
           }).then(function(res) {
               if(res == '000000'){
                   Widget.ShowAlert('密码正确！')
                   $rootScope.showMoreSetting = true;
               }else {
                   Widget.ShowAlert('密码错误！')
               }
           });
        }
    });