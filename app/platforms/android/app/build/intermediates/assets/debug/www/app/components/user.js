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
    .controller('settingCtrl', function($scope, config, DefaultConfig, Widget, $ionicPopup){
        $scope.config = config;
        $scope.reset = function(){
            $scope.config = config = DefaultConfig;
        }
        $scope.checkEmpty = function (key) {
            if($scope.config[key] === ""){
                $scope.config[key] = DefaultConfig[key]
            }
        }
        $scope.OpenMoreSetting = function(){
           $ionicPopup.prompt({
                title: '验证管理员身份',
                // template: 'Enter your secret password',
                inputType: 'password',
                inputPlaceholder: '请输入密码'
           }).then(function(res) {
               if(res == '000000'){
                   Widget.ShowAlert('密码正确！')
               }else {
                   Widget.ShowAlert('密码错误！')
               }
           });
        }
    });