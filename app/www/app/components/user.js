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
    .controller('settingCtrl', function($scope, config){

    });