/**
 * Created by 崔启蒙 on 2018/4/23.
 */
angular.module("app")
.controller('deviceListCtrl', function($scope, DeviceService, $state, EventBus,$timeout, $ionicModal){
    $scope.dList = DeviceService.GetDeviceList();
    $scope.DeviceService = DeviceService;
    var de = $scope.$on("UpdateDeviceList", function (ev, data) {
        console.log(6666666666);
        $timeout(function(){
            $scope.dList = data;
        })
    });

    $ionicModal.fromTemplateUrl('alarmsDetailModal', {
        scope: $scope,
        animation: 'slide-in-left',
        hardwareBackButtonClose: true,
        backdropClickToClose: true
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.alarmDetailModal = function(list) {
        $scope.CurAlarmList = list;
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // $scope.$watch(function () {
    //     return DeviceService.GetDeviceList();
    // }, function(data){
    //     console.log(111);
    //     data && ($scope.dList = data)
    // });
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