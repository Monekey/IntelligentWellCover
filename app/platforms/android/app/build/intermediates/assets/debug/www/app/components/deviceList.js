/**
 * Created by 崔启蒙 on 2018/4/23.
 */
angular.module("app")
.controller('deviceListCtrl', function($scope, DeviceService, $state, EventBus,$ionicScrollDelegate ){
    $scope.dList = DeviceService.GetDeviceList();
    $scope.DeviceService = DeviceService;
    var de = $scope.$on("UpdateDeviceList", function (ev, data) {
        console.log(6666666666);
        $scope.dList = data;
    });
    $scope.doRefresh = function(){
        $scope.dList = DeviceService.GetDeviceList();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.goDeviceDetail = function(device){
        var params = {deviceNo:device.deviceNo,deviceName: device.deviceName};
        $state.go('app.main.deviceDetail', params)
    };
    $scope.panTo = function(device){
        $state.go('app.main');
        EventBus.Publish('PANTO', device);
    }
    $scope.panToLocation = function(){
        EventBus.Publish('panToLocation')
    }
    $scope.$on("$destroy", function(){
        de();
    })
});